import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditPost from "../EditPost//EditPost";
import EditComment from "../EditComment/EditComment";
import Modal from "react-modal";
import "./OnePost.css";
import PostComment from "../PostComment/PostComment";
import { deleteOneComment, editOneComment } from "../../store/comments";

const OnePostModal = ({ postId, user, closeModal, singlePost }) => {
    const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }



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

  return (
      <div>
    <div className="one-post-cont">
      <img className="view-items img" src={singlePost?.image} />
      <div className="comments-side-bar" >
        <div className="comments-side-header">
          <h2>{user?.username} header</h2>
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
          <button onClick={openModal}>edit post</button>
        </div>
        <div className="side-comments-scroll" >
          <p>username</p>
          <div className="scroll-comments">
          {singlePost?.Comments?.map((comm, index) => {
            return  <div key={index} className="comm-spacing">
                {comm?.User?.image}<b>{comm?.User?.username}</b> {comm?.content}
                <button onClick={(() => dispatch(deleteOneComment(comm)))}>delete</button>
                <EditComment comm={comm}/>
                </div>
          })}
          </div>
          <div className="one-post-likes">
              <p>another cont here</p>
          </div>
          <div id='input-wid'>
          <PostComment postId={singlePost.id} userId={user.id} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OnePostModal;
