import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./SinglePost.css";
import { useParams } from "react-router-dom";
import { loadSinglePost } from "../../store/posts";

const SinglePost = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) =>
    Object.values(state.postsReducer?.Posts)
  );
  const singlePost = posts.find((post) => post.id === +postId);

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
    <div className="single-post-cont">
      <div className="flex-child">
        <div>
          <div className="header-comment">
            <img className="lft-img" src={singlePost?.image} />
            <div className="right-bar">
              <div className="child1">
                <h2>{user?.username} header</h2>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  overlayClassName="modal-delete"
                >
                  {/* <DeletePost closeModal={closeModal} postId={modalProps} /> */}
                </Modal>
                <button onClick={openModal}>edit post</button>
              </div>
              <div className="child2">
                <h2>comments box</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-child">
        <h2>other user posts</h2>
      </div>
    </div>
  );
};

export default SinglePost;
