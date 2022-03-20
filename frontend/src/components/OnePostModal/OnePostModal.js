import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditPost from "../EditPost//EditPost";
import EditComment from "../EditComment/EditComment";
import Modal from "react-modal";
import "./OnePost.css";
import PostComment from "../PostComment/PostComment";
import { deleteOneComment } from "../../store/comments";
import { FaUserCircle, FaEllipsisH } from "react-icons/fa";
import { GoTrashcan } from 'react-icons/go';

const OnePostModal = ({ postId, user, closeModal }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  const currentUser = useSelector((state) => state.session.user)
  const singlePost = useSelector((state) => state.postsReducer.Posts[postId])


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      width: '450px',
      height: '450px',
      padding: '0px',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div>
      <div className="one-post-cont">
        <img className="view-items img" src={singlePost?.image} />
        <div className="comments-side-bar">
          <div className="comments-side-header">
            <div id="icon-header">
              {user?.image ? (
                <img id="profile-img" src={user?.image} />
              ) : (
                <FaUserCircle className="icons" />
              )}
              <div className="username-head">
                <b>{singlePost?.User?.username}</b>
              </div>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              overlayClassName="modal-delete"
            >
              <EditPost
                closeModal={closeModal}
                postId={postId}
                postImg={singlePost?.image}
              />
            </Modal>
            {singlePost?.userId === currentUser.id &&
            <FaEllipsisH onClick={openModal} className="icons modal" />
            }
          </div>
          <div className="side-comments-scroll">
            <div className="one-post-cap">
              {user?.image ? (
                <img id="profile-img" src={user?.image} />
              ) : (
                <FaUserCircle className="icons" />
              )}
              <b>{singlePost?.User?.username}</b>
            </div>
              <div className="caption-lng">{singlePost?.caption}</div>
            <div className="scroll-comments">
              {singlePost?.Comments?.map((comm, index) => {
                return (
                  <div key={index} className="comm-spacing">
                    {comm.User?.image ? (
                <img id="profile-img" src={user?.image} />
              ) : (
                <FaUserCircle className="icons" />
              )}
                    <b>{comm?.User?.username}</b> <p className="break-wrd">{comm?.content}</p>
                    {comm.userId === currentUser.id && <>
                    <GoTrashcan className="comments-side-icons" onClick={() => dispatch(deleteOneComment(comm))} />
                    <EditComment comm={comm} />  </>}
                  </div>
                );
              })}
            </div>
            <div className="one-post-likes">
              <p>another cont here</p>
            </div>
            <div id="input-wid">
              <PostComment postId={singlePost.id} userId={user.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePostModal;
