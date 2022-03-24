import { csrfFetch } from "./csrf";

const LOAD_POSTS = 'user/LOAD_POSTS';
const LOAD_ONE_POST = 'user/LOAD_ONE_POST';
const LOAD_USERS_POSTS = 'user/LOAD_USERS_POSTS';
const EDIT_USER_PROFILE = 'user/EDIT_USER_PROFILE';
const CREATE_POST = 'user/CREATE_POST';
const DELETE_POST = 'user/DELETE_POST';
const EDIT_POST = 'user/EDIT_POST';
const ADD_COMMENT = 'user/ADD_COMMENT';
const DELETE_COMMENT = 'user/DELETE_COMMENT';
const EDIT_COMMENT = 'user/EDIT_COMMENT';
const ADD_LIKE = 'user/ADD_LIKE';
const REMOVE_LIKE = 'user/REMOVE_LIKE';
const ADD_DISLIKE = 'user/ADD_DISLIKE';
const REMOVE_DISLIKE = 'user/REMOVE_DISLIKE';


const editProfile = (user) => ({
    type: EDIT_USER_PROFILE,
    user
})

export const editUserProfile = (user) => async dispatch => {
    const response = await csrfFetch(`/api/users/${user.id}/edit`, {
        method: 'PATCH',
        body: JSON.stringify(
            user
        )
    })

    const data = await response.json();
    dispatch(editProfile(data))
    return data;
}

const loadUserPosts = (posts) => ({
    type: LOAD_USERS_POSTS,
    posts
})

export const loadAllUserPosts = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`);
    const posts = await response.json();
    dispatch(loadUserPosts(posts))
    return posts;
}


const removeDislike = (dislikeId, postId) => ({
    type: REMOVE_DISLIKE,
    dislikeId,
    postId
})

export const removeOneDislike = (dislikeId, postId) => async dispatch =>{
    const response = await csrfFetch('/api/dislikes/delete', {
        method: 'DELETE',
        body: JSON.stringify({
            dislikeId
        })
    })
    const deleteDislike = await response.json();
    dispatch(removeDislike(dislikeId, postId))
}


const addDislike = (newDislike) => ({
    type: ADD_DISLIKE,
    newDislike
})

export const addOneDislike = (postId, userId) => async dispatch => {
    const response = await csrfFetch(`/api/dislikes/new`, {
        method: 'POST',
        body: JSON.stringify({
            postId,
            userId
        })
    })
    const dislike = await response.json();
    dispatch(addDislike(dislike))
}


const removeLike = (likeId, postId) => ({
    type: REMOVE_LIKE,
    likeId,
    postId
})

export const removeOneLike = (likeId, postId) => async dispatch =>{
    const response = await csrfFetch('/api/likes/delete', {
        method: 'DELETE',
        body: JSON.stringify({
            likeId
        })
    })
    const deleteLike = await response.json();
    dispatch(removeLike(likeId, postId))
}

const addLike = (newLike) => ({
    type: ADD_LIKE,
    newLike
})

export const addOneLike = (postId, userId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/new`, {
        method: 'POST',
        body: JSON.stringify({
            postId,
            userId
        })
    })
    const newLike = await response.json();
    dispatch(addLike(newLike))
}


const editPost = (post) => ({
    type: EDIT_POST,
    post
})

export const editSinglePost = (post) => async dispatch => {
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
    if(post){
        dispatch(loadOnePost(post))
    }else {
        return post
    }
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
        // let posts = []
        action.postData.forEach((post) => newState.Posts[post.id] = post)
        // action.postData.forEach((post) => posts.push(post[post.id] = post))
        // newState.Posts = posts
        // console.log(newState.Posts, ' what happened')
        return newState;
    case DELETE_POST:
        newState = {...state}
        delete newState.Posts[action.postId]
        return newState;
    case LOAD_USERS_POSTS:
        newState = {...state}
        newState.Posts = {}
        action.posts.forEach((post) => newState.Posts[post.id] = post)
        return newState;
    case EDIT_USER_PROFILE:
        newState = {...state};
        const postsArr = Object.values(newState.Posts)
        postsArr.forEach((post) => post.User = action.user)
        return newState;
    case LOAD_ONE_POST:
        newState = {...state}
        newState.Posts[action.post.id] = action.post;
        return newState;
    case EDIT_POST:
        newState = {...state}
        newState.Posts[action.post.updated.id] = action.post.updated;
        return newState
    case ADD_COMMENT:
        newState = {...state}
        newState.Posts[action.comment.newComment.postId].Comments.push(action.comment.newComment);
        return newState;
    case DELETE_COMMENT:
        newState = {...state}
        const com = newState.Posts[action.comment.postId].Comments.filter((comm) => {return comm.id !== action.comment.id})
        newState.Posts[action.comment.postId].Comments = com
        return newState;
    case EDIT_COMMENT:
        newState = {...state}
       newState.Posts[action.comment.postId].Comments.forEach((comm, i) => {
            if (comm.id === action.comment.id){
                newState.Posts[action.comment.postId].Comments[i] = action.comment
            }
        })
        return newState
    case ADD_LIKE:
        newState = {...state}
        newState.Posts[action.newLike.postId].Likes.push(action.newLike);
        return newState;
    case REMOVE_LIKE:
        newState = {...state}
       const likesArr = newState.Posts[action.postId].Likes.filter((like) => like.id !== action.likeId);
       newState.Posts[action.postId].Likes = likesArr;
       return newState;
    case ADD_DISLIKE:
        newState = {...state}
        newState.Posts[action.newDislike.postId].Dislikes.push(action.newDislike);
        return newState;
    case REMOVE_DISLIKE:
        newState = {...state}
       const dislikesArr = newState.Posts[action.postId].Dislikes.filter((like) => like.id !== action.dislikeId);
       newState.Posts[action.postId].Dislikes = dislikesArr;
       return newState;
    default:
      return state;
  }
}


export default postsReducer;
