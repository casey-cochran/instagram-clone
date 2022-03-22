import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { loadAllUserPosts } from "../../store/posts";
import { FiEdit2 } from 'react-icons/fi';
import Modal from 'react-modal';
import EditProfile from "../EditProfile/EditProfile";
import { followUser, unfollowUser, loadAllFollows } from "../../store/followers";
import "./UserProfile.css";
import FollowUser from "../FollowUser/FollowUser";

const UserProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.session.user)
  const followState = useSelector((state) => state.followsReducer?.Follows)
  const userFollowers = useSelector((state) => state.followsReducer?.Follows)
   const userFollowing = useSelector((state) => state.followsReducer?.Following)
console.log(userFollowers?.length, ' waht is user followers')
  // let followers; // length of this is amount of followers
  //   let following; // length of this is amount of poeple the user is following
  //   if(followState?.length > 0) followers = userFollowers?.filter((follow) => follow.followedId === +userId )
  //   if(followState?.length > 0) following = followState?.filter((follow) => follow.followerId === currentUser.id )

  const userPosts = useSelector((state) =>
    Object.values(state.postsReducer?.Posts)
  );


  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
        width: '350px',
      height: '520px',
      top: "50%",
      outline: 0,
      padding: 0,
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    dispatch(loadAllUserPosts(userId));
    dispatch(loadAllFollows(userId))
    // if(!userPosts[0]?.User?.id) history.push('/')
  }, [dispatch, userId]);

  return (
    <div className="user-prof-cont">
      <div className="user-top-cont">
        <div className="user-prof-img-cont">
          <img
            className="user-prof-img"
            src={
              userPosts[0]?.User?.image
                ? userPosts[0]?.User?.image
                : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
          />
        </div>
        <div className="user-data-cont">
          <div className="name-follow">
            <div>
              <b>{userPosts[0]?.User?.username}</b>
            </div>
            <FollowUser />
            <div>
                {(currentUser.id === userPosts[0]?.User?.id || userPosts?.length === 0) &&
              <FiEdit2
                className="icons"
                onClick={() => {
                  setIsOpen(true);
                }}
              /> }
              <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              overlayClassName="modal-delete"
              >
                  <EditProfile user={userPosts[0]?.User} closeModal={closeModal}/>
              </Modal>
            </div>
          </div>
          <div className="post-follow-count">
            <div>{userPosts?.length > 0 ? userPosts?.length : 0} Posts</div>
            <div>{userFollowers?.length > 0 ? userFollowers?.length : 0} Followers</div>
            <div>{userFollowing?.length > 0 ? userFollowing?.length : 0} Following</div>
          </div>
          <div>
            <div>
              <b>Bio:</b>
            </div>
            <div>
              {userPosts[0]?.User?.bio ? userPosts[0]?.User?.bio : "Add a bio"}
            </div>
          </div>
        </div>
      </div>
      <div className="user-bottom-cont">
        <div className="user-post-img-cont">
          {userPosts?.map((post, index) => {
            return (
              <div key={index}>
                <div>
                  <Link to={`/posts/${post.id}`}>
                    <img className="profile-img-loop" src={post.image} />{" "}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
