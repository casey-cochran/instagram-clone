import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { loadAllUserPosts } from "../../store/posts";
import { FiEdit2 } from 'react-icons/fi';
import Modal from 'react-modal';
import EditProfile from "../EditProfile/EditProfile";
import {  loadAllFollows } from "../../store/followers";
import "./UserProfile.css";
import FollowUser from "../FollowUser/FollowUser";
import ViewFollowers from "../ViewFollowers/ViewFollowers";
import ViewFollowing from "../ViewFollowing/ViewFollowing";

const UserProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.session.user)
  const userFollowers = useSelector((state) => state.followsReducer?.Follows)
  const userFollowing = useSelector((state) => state.followsReducer?.Following)

  const userPosts = useSelector((state) =>
    Object.values(state.postsReducer?.Posts)
  );


  const [modalIsOpen, setIsOpen] = useState(false);
  const [followOpen, setFollowOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followingProps, setFollowingProps] = useState(null);
  const [followProps, setFollowProps] = useState(null);

  const openFollowingModal = () => {
    setFollowingProps(userFollowing);
    setFollowingOpen(true);
  }

  const closeFollowingModal = () => {
    setFollowingOpen(false)
  }

  const openFollowModal = () => {
    setFollowProps(userFollowers)
    setFollowOpen(true);
  }

  const closeFollowModal = () => {
    setFollowOpen(false)
  }

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
              <b>{userPosts[0]?.User?.username ? userPosts[0]?.User?.username : currentUser?.username}</b>
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
            <div>{userPosts?.length > 0 ? userPosts?.length : 0}  <b>Posts</b></div>
            <div>{userFollowers?.length > 0 ? userFollowers?.length : 0} <button className="following-btns" onClick={openFollowModal}>Followers</button>
            <Modal
              isOpen={followOpen}
              onRequestClose={closeFollowModal}
              style={customStyles}
              >
                <ViewFollowers follow={followProps} closeModal={closeFollowModal}/>
            </Modal>
            </div>
            <div>{userFollowing?.length > 0 ? userFollowing?.length : 0}<button className="following-btns" onClick={openFollowingModal}>Following</button></div>
            <Modal
              isOpen={followingOpen}
              onRequestClose={closeFollowingModal}
              style={customStyles}
              >
                <ViewFollowing closeModal={closeFollowingModal} following={followingProps} />
              </Modal>
          </div>
          <div>
            <div>
              <b>Bio:</b>
            </div>
            <div>
              {userPosts[0]?.User?.bio  ? userPosts[0]?.User?.bio  : currentUser?.bio}
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
