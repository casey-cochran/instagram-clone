import { csrfFetch } from "./csrf";


const ADD_COMMENT = 'user/ADD_COMMENT';


const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})


export const addSingleComment = (comment) => async dispatch => {
    const response = await csrfFetch(`api/users/posts/${comment.postId}/comments/new`, {
        method: 'POST',
        body: JSON.stringify(
            comment
        )
    })
    const newComment = await response.json();
    dispatch(addComment(newComment))
}


const initialState = { Comments: {} };

function commentsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case ADD_COMMENT:
        newState = {...state}
        newState[action.comment.newComment.id] = action.comment.newComment
        return newState;
    default:
      return state;
  }
}


export default commentsReducer;
