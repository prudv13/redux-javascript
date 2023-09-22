const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';

// state
const initialState = {
    numOfCakes: 10,
}

// action creator
function orderCake(){
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
}

function restockCake(qty = 1){
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

// reducer: (previousState, action) => newState
const reducer = (state = initialState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            };
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            };
        default:
            return state;
    }
}

//redux store
const store = createStore(reducer);
console.log('initial state', store.getState())

// register listener
const unsubscribe = store.subscribe(() => console.log('updated state', store.getState()));

// bind action creators
const actions = bindActionCreators({orderCake, restockCake}, store.dispatch)

// dispatch an action to reducer
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)

// unregister a listener
unsubscribe()