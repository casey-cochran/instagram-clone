import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadAllPosts } from "../../store/posts";
import "./HomeFeed.css";
import Modal from "react-modal";
import DeletePost from "../DeletePost/DeletePost";
import PostComment from "../PostComment/PostComment";
import OnePostModal from "../OnePostModal/OnePostModal";
import { FaUserCircle, FaEllipsisH, FaRegComment } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import PostCommentFeed from "../PostCommentFeed/PostCommentFeed";

const HomeFeed = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userId = useSelector((state) => state.session.user?.id);
  const posts = useSelector((state) =>
    Object.values(state.postsReducer?.Posts)
  );
  posts?.reverse();
  const comments = useSelector((state) =>
    Object.values(state.commentsReducer.Comments)
  );

  const customStyles = {
    content: {
      top: "50%",
      outline: 0,
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
  const [openComm, setOpenComm] = useState(false);
  const inputId = 'home-comment'

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const openCommModal = () => {
    setOpenComm(true);
  };
  const closeCommModal = () => {
    setOpenComm(false);
  };

  useEffect(() => {
    dispatch(loadAllPosts());
  }, [dispatch]);

  return (
    <div id="main-cont">
      <div className="user-feed">
        {posts.length > 0 &&
          posts?.map((post, index) => {
            return (
              <div className="post-cont" key={index}>
                <div className="post-menu">
                  <div className="icon-user">
                    {post.User.image ? (
                      <img id="profile-img" src={post.User.image} />
                    ) : (
                      <FaUserCircle className="icons" />
                    )}
                    <p>{post.User.username} </p>
                  </div>

                  <FaEllipsisH
                    className="icons"
                    onClick={() => {
                      setIsOpen(true);
                      setModalProps(post.id);
                    }}
                  />
                </div>
                <div>
                  <img src={post?.image} />
                </div>
                <div id="testing">
                  <div className="likes-cont">
                    <p>
                      <AiOutlineHeart className="icons" />
                    </p>
                    <FaRegComment
                      className="icons"
                      onClick={() => {
                        setModalPost(post);
                        setModalProps(post.id);
                        openCommModal();
                      }}
                    />
                    <p>
                      <HiOutlinePaperAirplane className="icons" />
                    </p>
                  </div>
                  <div className="sub-likes-cont">
                    <p>likes count</p>
                    <p id="sub-likes-f">
                      <b>{user.username}</b> {post?.caption}
                    </p>
                    <p onClick={() => {
                        setModalPost(post);
                        setModalProps(post.id);
                        openCommModal();
                      }} className="view-all">
                      View all {post?.Comments?.length} comments
                    </p>
                  </div>
                  {comments?.map((com, index) => {
                    return (
                      <div key={index}>
                        <p className="home-comments" >
                          {com.postId === post.id ? <div className="com-content-cont"><b>{com.User?.username}</b> <p id='com-content'>{com.content}</p></div> : ''}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="comm-input-feed">
                  <PostCommentFeed postId={post?.id} userId={userId} />
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
          className="view-comm-modal"
          overlayClassName="modal-delete"
        >
          <OnePostModal
            closeModal={closeCommModal}
            user={user}
            postId={modalProps}
            singlePost={modalPost}
            inputId={inputId}
          />
        </Modal>
      </div>
      <div>
        <h3>side bar content</h3>
      </div>
    </div>
  );
};

export default HomeFeed;
