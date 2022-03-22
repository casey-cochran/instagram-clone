import { followUser, unfollowUser, loadAllFollows } from "../../store/followers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import './FollowUser.css';

const FollowUser = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const currentUser = useSelector((state) => state.session.user)
    const followState = useSelector((state) => state.followsReducer?.Follows)
    const userFollowers = useSelector((state) => state.followsReducer?.Follows)
    const userPosts = useSelector((state) =>
    Object.values(state.postsReducer?.Posts)
  );
    // let followers; // length of this is amount of followers
    // let following; // length of this is amount of poeple the user is following
    let alreadyFollowed;

    // if(followState?.length > 0) followers = userFollowers?.filter((follow) => follow.followedId === +userId )
    // if(followState?.length > 0) following = followState?.filter((follow) => follow.followerId === +userId )
    if(userFollowers?.length > 0) alreadyFollowed = userFollowers?.find((follow) => follow?.id === currentUser.id)
    const ifFollow = () => {
        const follow = userFollowers?.find((follow) => follow?.id === currentUser.id)
        if(follow ){
            dispatch(unfollowUser(currentUser.id, userPosts[0]?.User?.id))
        }else {
            dispatch(followUser(currentUser.id, userPosts[0]?.User?.id))
        }
    }


    return (
        <>
            <div>
                {userPosts[0]?.User?.id !== currentUser.id &&
              <button className="follow-btn" onClick={ifFollow}>{alreadyFollowed  ? 'Following' : 'Follow'}</button>
                }
            </div>
        </>
    )
}


export default FollowUser;
