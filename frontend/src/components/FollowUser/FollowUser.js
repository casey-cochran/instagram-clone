import { followUser, unfollowUser, loadAllFollows } from "../../store/followers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import './FollowUser.css';

const FollowUser = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const currentUser = useSelector((state) => state.session.user)
    const userFollowers = useSelector((state) => state.followsReducer?.Follows)
    const userPosts = useSelector((state) =>
    Object.values(state.postsReducer?.Posts)
  );
    let alreadyFollowed;


    if(userFollowers?.length > 0) alreadyFollowed = userFollowers?.find((follow) => follow?.id === currentUser.id)
    const ifFollow = () => {
        // const follow = userFollowers?.find((follow) => follow?.id === currentUser.id)
        if(alreadyFollowed ){
            dispatch(unfollowUser(currentUser.id, userId))
        }else {
            dispatch(followUser(currentUser.id, userId))
        }
    }


    return (
        <>
            <div>
                {+userId !== currentUser.id &&
              <button className="follow-btn" onClick={ifFollow}>{alreadyFollowed  ? 'Following' : 'Follow'}</button>
                }
            </div>
        </>
    )
}


export default FollowUser;
