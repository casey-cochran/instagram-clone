import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadAllUserPosts } from "../../store/posts";
import {FaEllipsisH} from 'react-icons/fa';
import './UserProfile.css';


const UserProfile = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const user = useSelector((state) => state.session.user)
    const userPosts = useSelector((state) => Object.values(state.postsReducer?.Posts));
    console.log(userPosts, ' did it work ?')

    useEffect(() => {
        dispatch(loadAllUserPosts(userId))
    },[dispatch])


    return (
        <div className="user-prof-cont">
            <div className="user-top-cont">
                <div className="user-prof-img-cont">
                    <img className="user-prof-img" src={userPosts[0]?.User?.image ? userPosts[0]?.User?.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' } />
                </div>
                <div className="user-data-cont">
                    <div className="name-follow">
                        <div><b>{userPosts[0]?.User?.username}</b></div>
                        <div>follow</div>
                        <div><FaEllipsisH /></div>
                    </div>
                    <div className="post-follow-count">
                        <div>{userPosts?.length} posts</div>
                        <div>followers count</div>
                        <div>following count</div>
                    </div>
                    <div>
                        <div><b>Bio:</b></div>
                        <div>{userPosts[0]?.User?.bio ? userPosts[0]?.User?.bio : 'Add a bio'}</div>
                    </div>
                </div>
                </div>
            <div className="user-bottom-cont">
                <div className="user-post-img-cont">
                   {userPosts?.map((post, index) => {
                       return(
                           <div key={index}>
                               <div>
                                   <img className="profile-img-loop" src={post.image} />
                                </div>
                           </div>
                       )
                   })}
                </div>
            </div>
        </div>
    )
}



export default UserProfile;
