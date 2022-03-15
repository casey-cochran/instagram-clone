import { csrfFetch } from "./csrf";

const LOAD_POSTS = 'user/LOAD_POSTS';
const CREATE_POST = 'user/CREATE_POST';

const createPost = (post) => ({
    type: CREATE_POST,
    post
});

export const createUserPost = (post) => async dispatch => {
    console.log(post, ' is it sending a post to the thunk?')
    const response = await csrfFetch('/api/users/post/new', {
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
        newState.Posts = action.postData;
        return newState;
    default:
      return state;
  }
}


export default postsReducer;
