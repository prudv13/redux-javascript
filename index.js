const redux = require('redux');

const CAKE_ORDERED = 'CAKE_ORDERED';

// state
const initialState = {
    numOfCakes: 10,
}

// action creator
function orderCake(){
    return {
        type: CAKE_ORDERED,
        quantity: 1,
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
        default:
            return state;
    }
}