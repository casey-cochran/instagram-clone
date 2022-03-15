import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadAllPosts } from "../../store/posts";
import './HomeFeed.css';
import { useHistory } from "react-router-dom";

const HomeFeed = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postsReducer?.Posts)
    const user = useSelector((state) => state.session.user?.id)
    const history = useHistory();

    

    useEffect(() => {
        dispatch(loadAllPosts());
    },[dispatch])


    return (
        <div id='main-cont'>
            <div className="user-feed">
            <h2>hello from home feed</h2>

            <button onClick={(() => dispatch(loadAllPosts()))}>load posts</button>
            {posts.length > 0 && posts.map((post, index) => {
                return <div key={index}><p>{post.caption}</p></div>
            }) }
            </div>
            <div>
                <h3>side bar content</h3>
            </div>
        </div>
    )
}


export default HomeFeed;
