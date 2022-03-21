import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadAllUserPosts } from "../../store/posts";
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
                <div className="user-prof-img">image here</div>
                <div className="user-data-cont">
                    <div className="name-follow">
                        <div>name</div>
                        <div>follow</div>
                        <div>menu option? if owner can edit picture or bio?</div>
                    </div>
                    <div className="post-follow-count">
                        <div>posts count</div>
                        <div>followers count</div>
                        <div>following count</div>
                    </div>
                    <div>
                        <div>username again</div>
                        <div>bio of user?</div>
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
