import { csrfFetch } from "./csrf";



const LOAD_USER = 'user/LOAD_USER';

const loadUser = (user) => ({
  type: LOAD_USER,
  user
})

export const loadAUser = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}/validate`)
  const data = await response.json();
  if(data){
      dispatch(loadUser(data))
  }
}

const initialState = { User: null };

function usersReducer(state = initialState, action){
    let newState;
    switch(action.type){
        case LOAD_USER:
            newState = {...state}
            newState.User = action.user
            return newState;
        default:
            return state;
    }
}

export default usersReducer;
