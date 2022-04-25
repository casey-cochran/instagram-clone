import { csrfFetch } from "./csrf";

const SEARCH_VALUE = 'user/SEARCH';

const search = (value) => {
    return {
        type: SEARCH_VALUE,
        value
    }
}


const searchUser = (value) => async dispatch => {
    const response = await csrfFetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({
            value
        })
    })
    const data = await response.json();
    dispatch(search(data))
}


const initialState = {Search: {}}

const searchReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case SEARCH_VALUE:
        newState = {...state}
        newState.Search = action.data
        return newState;
        default:
        return state;
    }
}


export default searchReducer;
