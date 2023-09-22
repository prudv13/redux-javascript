const redux = require('redux');
const thunk = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleWare = redux.applyMiddleware;

const initialState = {
    loading: false,
    users: [],
    error: '',
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

// action creators
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error,
    }
}

// reducer
const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USERS_SUCCEEDED:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }
        default: return state;
    }
}

// async action creator
const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            const users = response.data.map(user => user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error => dispatch(fetchUsersFailure(error.message)))
    }
}

// redux store
const store = createStore(reducer, applyMiddleWare(thunk))

// register listener
store.subscribe(() => console.log(store.getState()))

// dispatching async actions
store.dispatch(fetchUsers())
