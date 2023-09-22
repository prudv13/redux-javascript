const redux = require('redux');
const createStore = redux.createStore;
const produce = require('immer').produce;

const initialState = {
    name: 'Prudhvi',
    address: {
        street: "KRM Colony",
        city: 'Vizag',
        state: 'AP'
    },
}

// constants
const STREET_UPDATED = 'STREET_UPDATED';

// ACTION CREATORS
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

// reducer to update state
const reducer = (state = initialState, action) => {
    switch(action.type){
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload,
            //     },
            // };
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        default:
            return state;
    }
}

// redux store
const store = createStore(reducer)
console.log('initial state', store.getState())

// register listener
const unsubscribe = store.subscribe(() => {
    console.log('updated state', store.getState())
})

store.dispatch(updateStreet('HB Colony'))

// unregister listener
unsubscribe()
