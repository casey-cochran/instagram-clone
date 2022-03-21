import { csrfFetch } from "./csrf";


const FOLLOW_USER = 'user/FOLLOW_USER';
const UNFOLLOW_USER = 'user/UNFOLLOW_USER';


const unfollow = (currentUserId, userId) => ({
    type: UNFOLLOW_USER,
    currentUserId,
    userId
})

export const unfollowUser = (currentUserId, userId) => async dispatch => {
    const response = await csrfFetch(`/api/follows/delete`, {
        method: 'DELETE',
        body: JSON.stringify({
            currentUserId,
            userId
        })
    })
    const data = await response.json();
    console.log(data, ' did it delete?')
}

const follow = (currentUserId, userId) => ({
    type: FOLLOW_USER,
    currentUserId,
    userId
})

export const followUser = (currentUserId, userId) => async dispatch => {
    const response = await csrfFetch(`/api/follows/${userId}`, {
        method: 'POST',
        body: JSON.stringify({
            currentUserId,
            userId
        })
    })
    const data = await response.json();
    console.log(data, ' is follow here ?')
}


const initialState = {Follows: {}};

function followsReducer(state = initialState, action){
    let newState;
    switch(action.type){
        default:
            return state;
    }
}

export default followsReducer;
