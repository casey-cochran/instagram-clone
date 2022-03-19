import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./SinglePost.css";
import { useParams } from "react-router-dom";
import { loadSinglePost } from "../../store/posts";
import EditPost from "../EditPost/EditPost";
import {FaUserCircle, FaEllipsisH} from 'react-icons/fa';
import {GoTrashcan} from 'react-icons/go';
import { deleteOneComment } from "../../store/comments";
import EditComment from "../EditComment/EditComment";
import PostComment from "../PostComment/PostComment";

const SinglePost = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) =>
    Object.values(state.postsReducer?.Posts)
  );
  // const singlePost = posts.find((post) => post.id === +postId);
  //Edit the navlink in deletepost and App component to get functions to work
  const singlePost = useSelector((state) => state.postsReducer.Posts[postId])
  console.log(singlePost, ' single post')
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState(null);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    dispatch(loadSinglePost(postId));
  }, [dispatch]);

  return (
    <div id='testing3'>
    <div className="one-post-cont ">
      <img className="view-items img single" src={singlePost?.image} />
      <div className="comments-side-bar single">
        <div className="comments-side-header">
          <div id="icon-header">
            {user?.image ? (
              <img id="profile-img" src={user?.image} />
            ) : (
              <FaUserCircle className="icons" />
            )}
            <div className="username-head">
              <b>{user?.username}</b>
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
          <FaEllipsisH onClick={openModal} className="icons modal" />
        </div>
        <div className="side-comments-scroll single">
          <div className="one-post-cap">
            {user?.image ? (
              <img id="profile-img" src={user?.image} />
            ) : (
              <FaUserCircle className="icons" />
            )}
            <b>{user?.username}</b>
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
                  <GoTrashcan className="comments-side-icons" onClick={() => dispatch(deleteOneComment(comm))} />
                  <EditComment comm={comm} />
                </div>
              );
            })}
          </div>
          <div className="one-post-likes">
            <p>another cont here</p>
          </div>
          <div id="input-wid">
            <PostComment postId={singlePost?.id} userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SinglePost;
