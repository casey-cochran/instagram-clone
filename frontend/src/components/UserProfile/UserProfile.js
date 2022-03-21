import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { loadAllUserPosts } from "../../store/posts";
import { FaEllipsisH } from "react-icons/fa";
import Modal from 'react-modal';
import "./UserProfile.css";
import EditProfile from "../EditProfile/EditProfile";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.session.user)
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
      height: '500px',
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
  }, [dispatch]);

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
            <div>follow</div>
            <div>
                {currentUser.id === userPosts[0]?.User?.id &&
              <FaEllipsisH
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
            <div>{userPosts?.length} posts</div>
            <div>followers count</div>
            <div>following count</div>
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
