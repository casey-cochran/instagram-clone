import { csrfFetch } from "./csrf";


const ADD_COMMENT = 'user/ADD_COMMENT';
const DELETE_COMMENT = 'user/DELETE_COMMENT';
const EDIT_COMMENT = 'user/EDIT_COMMENT';

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
})

export const editOneComment = (comment) => async dispatch => {
    console.log(comment, 'comment coming into thunk')
    const response = await csrfFetch(`api/users/posts/${comment.postId}/comments/${comment.id}/edit`,{
        method: 'PATCH',
        body: JSON.stringify({
            comment
        })
    })
    const data = await response.json();
    console.log(data,' is this the correct edit ?')
}


const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment
})

export const deleteOneComment = (comment) => async dispatch => {
    const response = await csrfFetch(`api/users/posts/${comment.postId}/comments/delete`, {
        method: 'DELETE',
        body: JSON.stringify({comment})
    })
    const data = await response.json();
    dispatch(deleteComment(comment));
}


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
        newState.Comments[action.comment.newComment.id] = action.comment.newComment
        return newState;
    default:
      return state;
  }
}


export default commentsReducer;
