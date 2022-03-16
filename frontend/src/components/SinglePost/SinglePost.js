import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import './SinglePost.css';
import { useParams } from 'react-router-dom';
import { loadSinglePost } from '../../store/posts';



const SinglePost = () => {
    const dispatch = useDispatch();
    const {postId }= useParams();
    const posts = useSelector((state) => Object.values(state.postsReducer?.Posts))
    const singlePost = posts.find((post) => post.id === +postId)

    useEffect(() => {
        dispatch(loadSinglePost(postId))
    },[dispatch])


    return (
        <div className="single-post-cont">
            <div className='flex-child'>
                <h2>hello from single post</h2>
                <p>{singlePost?.caption}</p>
            </div>
            <div className='flex-child'>
                <h2>other user posts</h2>
            </div>
        </div>
    )

}



export default SinglePost;
