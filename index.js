const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleWare = redux.applyMiddleware;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

// CONSTANTS ==============================
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

// state

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20,
}

// action creator ===========================

function orderCake(qty = 1){
    return {
        type: CAKE_ORDERED,
        payload: qty,
    }
}

function restockCake(qty = 1){
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

function orderIceCream(qty = 1){
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    }
}

function restockIceCream(qty = 1){
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    }
}

// reducer: (previousState, action) => newState ====================================
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - action.payload
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

const icecreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type){
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - action.payload
            };
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            };
        default:
            return state;
    }
}

// combine multiple reducers
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: icecreamReducer,
})

//redux store
const store = createStore(rootReducer, applyMiddleWare(logger));
console.log('initial state', store.getState())

// register listener
const unsubscribe = store.subscribe(() => {});

// bind action creators
const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch)

// dispatch an action to reducer
actions.orderCake()
actions.orderCake()
actions.orderCake(3)
actions.restockCake(3)

actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream(3)
actions.restockIceCream(3)

// unregister a listener
unsubscribe()