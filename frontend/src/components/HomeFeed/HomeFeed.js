import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadAllPosts } from "../../store/posts";
import "./HomeFeed.css";
import { useHistory, NavLink } from "react-router-dom";
import Modal from "react-modal";
import DeletePost from "../DeletePost/DeletePost";
import PostComment from "../PostComment/PostComment";
import OnePostModal from "../OnePostModal/OnePostModal";


const HomeFeed = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const userId = useSelector((state) => state.session.user?.id);
  const posts = useSelector((state) =>
    Object.values(state.postsReducer?.Posts)
  );
//   posts?.reverse()
  const comments = useSelector((state) =>
    Object.values(state.commentsReducer.Comments)
  );


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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState(null);
  const [modalPost, setModalPost] = useState(null);
  const [commentProps, setCommentProps] = useState(null);
  const [openComm, setOpenComm] = useState(false)

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const openCommModal = () => {
    setOpenComm(true);
  }
  const closeCommModal = () => {
    setOpenComm(false);
}

  useEffect(() => {
    dispatch(loadAllPosts());
  }, [dispatch]);

  return (
    <div id="main-cont">
      <div className="user-feed">
        <h2>hello from home feed</h2>

        <button onClick={() => dispatch(loadAllPosts())}>load posts</button>
        {posts.length > 0 &&
          posts?.map((post, index) => {
            return (
              <div className="post-cont" key={index}>
                <div className="post-menu">
                  <p>user name and prof image </p>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setModalProps(post.id);
                    }}
                  >
                    modal to delete
                  </button>
                </div>
                <div>
                  <img src={post?.image} />
                </div>
                <div id='testing'>
                  <div className="likes-cont">
                    <p>likes</p>
                    <button onClick={() => {
                        setModalPost(post)
                        setModalProps(post.id)
                        openCommModal()
                    }}>add comment</button>
                    <p>send message</p>
                  </div>
                  <p>{user.username} {post?.caption}</p>
                  <p>View all {post?.Comments?.length} comments</p>
                    {comments?.map((com, index) => {
                        return (
                            <>
                            <p key={index}>{com.postId === post.id && com.content}</p>
                            </>
                        )
                    })}
                  <PostComment postId={post?.id} userId={userId} />
                </div>
              </div>
            );
          })}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          overlayClassName="modal-delete"
        >
          <DeletePost closeModal={closeModal} postId={modalProps} />
        </Modal>
        <Modal
          isOpen={openComm}
          onRequestClose={closeCommModal}
          style={customStyles}
          className='view-comm-modal'
          overlayClassName="modal-delete"
        >
          <OnePostModal closeModal={closeCommModal} user={user} postId={modalProps} singlePost={modalPost}/>
        </Modal>
      </div>
      <div>
        <h3>side bar content</h3>
      </div>
    </div>
  );
};

export default HomeFeed;
