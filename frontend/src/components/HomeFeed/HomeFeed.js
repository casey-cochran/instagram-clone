import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadAllPosts } from "../../store/posts";
import { useHistory, Link } from "react-router-dom";
import "./HomeFeed.css";
import Modal from "react-modal";
import DeletePost from "../DeletePost/DeletePost";
import OnePostModal from "../OnePostModal/OnePostModal";
import { FaEllipsisH, FaRegComment } from "react-icons/fa";
import {AiOutlineGithub} from 'react-icons/ai';
import {BsLinkedin} from 'react-icons/bs'
import PostCommentFeed from "../PostCommentFeed/PostCommentFeed";
import AddLikes from "../Likes/Likes";
import AddDislikes from "../Dislike/AddDislike";

const HomeFeed = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const userId = useSelector((state) => state.session.user?.id);
  const posts = useSelector((state) =>
    Object.values(state.postsReducer?.Posts)
  );
  posts?.reverse();
  const comments = useSelector((state) =>
    Object.values(state.commentsReducer.Comments)
  );

  if (!user) history.push('/login');

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

  const deleteModalStyles = {
    content: {
      width: '250px',
      height: '250px',
      padding: '0px',
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
  // const [commentProps, setCommentProps] = useState(null);
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
                      <img id="profile-img" src={post.User?.image ? post.User?.image : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} />

                    <Link className="link-to-user" to={`/users/${post?.userId}`}>{post.User?.username} </Link>
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
                  <img className="add-img home" src={post?.image} />
                </div>
                <div id="testing">
                  <div className="likes-cont">
                    <p>
                      <AddLikes postId={post?.id} userId={post?.userId}/>
                    </p>
                    <p>
                      <AddDislikes postId={post?.id} userId={post?.userId} />
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
                      {/* <HiOutlinePaperAirplane className="icons" /> TODO sendmessages link */}
                    </p>
                  </div>
                  <div className="sub-likes-cont">
                    <p>{post?.Likes?.length ? post?.Likes?.length : 0} Likes {post?.Dislikes?.length ? post?.Dislikes?.length : 0} Dislikes</p>
                    <div id="sub-likes-f">
                    <Link className="link-to-user" to={`/users/${post?.userId}`}>{post.User?.username} </Link> {post?.caption}
                    </div>
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
                        <div className="home-comments" >
                          {com.postId === post.id ? <div className="com-content-cont"><b>{com.User?.username}</b> <p id='com-content'>{com.content}</p></div> : ''}
                        </div>
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
          style={deleteModalStyles}
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
      <div className='home-side-cont'>
      <div className='side-child'>
        <h3 id='side-title'>About this developer</h3>
        <div>
          <Link
            to={{ pathname: "https://github.com/casey-cochran" }}
            target="_blank"
            className="side-link"
          >
            Github <AiOutlineGithub id='github'/>
          </Link>
        </div>
        <div>
          <Link
            to={{
              pathname: "https://linkedin.com/in/casey-cochran-488420219/",
            }}
            target="_blank"
            className="side-link"
          >
            LinkedIn <BsLinkedin id='linkedin'/>
          </Link>
        </div>
        <div>
          <p className='tech-names-title'>Technologies Used</p>
        <p className='tech-names'>React, Redux, Express, Sequelize, HTML, CSS </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HomeFeed;
