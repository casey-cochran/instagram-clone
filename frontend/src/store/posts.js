import { csrfFetch } from "./csrf";

const LOAD_POSTS = 'user/LOAD_POSTS';
const LOAD_ONE_POST = 'user/LOAD_ONE_POST'
const CREATE_POST = 'user/CREATE_POST';
const DELETE_POST = 'user/DELETE_POST';
const EDIT_POST = 'user/EDIT_POST';


const editPost = (post) => ({
    type: EDIT_POST,
    post
})

export const editSinglePost = (post) => async dispatch => {
    console.log(post, ' any post hitting the thunk?')
    const response = await csrfFetch(`/api/users/posts/${post.postId}/edit`, {
        method: 'PATCH',
        body: JSON.stringify(
            post
        )
    })
    const updatedPost = await response.json()
    dispatch(editPost(updatedPost))
    return updatedPost
}

const loadOnePost = (post) => ({
    type: LOAD_ONE_POST,
    post
})

export const loadSinglePost = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/users/posts/${postId}`)
    const post = await response.json()
    dispatch(loadOnePost(post))
    return post
}


const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
})

export const deleteSinglePost = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/users/posts/${postId}/delete`, {
        method: 'DELETE',
        body: JSON.stringify({
            postId
        })
    })
    const deleted = await response.json()
    dispatch(deletePost(postId))
    return deleted
}


export const createUserPost = (post) => async dispatch => {
    const response = await csrfFetch('/api/users/posts/new', {
        method: 'POST',
        body: JSON.stringify(post)
    })
    const data = await response.json()
    return data
}

const loadPosts = (postData) => ({
    type: LOAD_POSTS,
    postData
})

export const loadAllPosts = () => async dispatch => {
    const response = await csrfFetch('/api/users')
    const postData = await response.json()
    dispatch(loadPosts(postData))
}







const initialState = { Posts: {} };

function postsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD_POSTS:
        newState = {...state}
        action.postData.forEach((post) => newState.Posts[post.id] = post)
        return newState;
    case DELETE_POST:
        newState = {...state}
        delete newState.Posts[action.postId]
        return newState;
    case LOAD_ONE_POST:
        newState = {...state}
        newState.Posts[action.post.id] = action.post;
        return newState;
    case EDIT_POST:
        newState = {...state}
        newState.Posts[action.post.updated.id] = action.post.updated;
        return newState
    default:
      return state;
  }
}


export default postsReducer;
