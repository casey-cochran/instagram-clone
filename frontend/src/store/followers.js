import { csrfFetch } from "./csrf";

const LOAD_FOLLOWS = 'user/LOAD_FOLLOWS';
const FOLLOW_USER = 'user/FOLLOW_USER';
const UNFOLLOW_USER = 'user/UNFOLLOW_USER';


const loadFollows = (follows) => ({
    type: LOAD_FOLLOWS,
    follows
})

export const loadAllFollows = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/follows/${userId}`)
    const follows = await response.json();
    // console.log(follows,' what are all the follows returned')
    dispatch(loadFollows(follows))
}

const unfollow = (currentUserId) => ({
    type: UNFOLLOW_USER,
    currentUserId
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
    dispatch(unfollow(currentUserId))
}

const follow = (user) => ({
    type: FOLLOW_USER,
    user
})

export const followUser = (currentUserId, userId) => async dispatch => {
    const response = await csrfFetch(`/api/follows/${userId}`, {
        method: 'POST',
        body: JSON.stringify({
            currentUserId,
            userId
        })
    })
    const user = await response.json();
    dispatch(follow(user))
}


const initialState = {Follows: {}};

function followsReducer(state = initialState, action){
    let newState;
    switch(action.type){
        case LOAD_FOLLOWS:
            newState = {...state};
            // console.log(action.follows, ' waht is action follows')
            newState.Follows = action.follows.followed
            newState.Following = action.follows.followers
            return newState;
        case FOLLOW_USER:
            newState = {...state};
            newState.Follows.push(action.user)
            return newState;
        case UNFOLLOW_USER:
            newState = {...state};
            const followsArr = newState.Follows.filter((follow => follow.id !== action.currentUserId))
             newState.Follows = followsArr;
            return newState;
        default:
            return state;
    }
}

export default followsReducer;
