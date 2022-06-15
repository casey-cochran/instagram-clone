import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./SinglePost.css";
import { useParams, useHistory, Link} from "react-router-dom";
import { loadSinglePost } from "../../store/posts";
import EditPost from "../EditPost/EditPost";
import { FaUserCircle, FaEllipsisH } from "react-icons/fa";
import { GoTrashcan } from "react-icons/go";
import { deleteOneComment } from "../../store/comments";
import EditComment from "../EditComment/EditComment";
import PostComment from "../PostComment/PostComment";
import AddLikes from "../Likes/Likes";
import AddDislikes from "../Dislike/AddDislike";

const SinglePost = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) =>
    Object.values(state.postsReducer?.Posts)
  );
  if (!user) history.push('/login');
  const singlePost = posts.find((post) => post.id === +postId);


  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState(null);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      padding: '0px',
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
    document.body.style.overflow='scroll';
    dispatch(loadSinglePost(postId))
  }, [dispatch]);

  return (
    <div className="single-p-cont"> {singlePost?.id ?
    <div id="testing3">
      <div className="one-post-cont ">
        <img className="view-items img single" src={singlePost?.image} />
        <div className="comments-side-bar single">
          <div className="comments-side-header">
            <div id="icon-header">
                <img id="profile-img" src={singlePost?.User?.image ? singlePost?.User?.image : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} />
              <div className="username-head">
              <Link className="link-to-user" to={`/users/${singlePost?.userId}`}>{singlePost?.User?.username}</Link>
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
            {user.id === singlePost?.userId && (
              <FaEllipsisH onClick={openModal} className="icons modal" />
            )}
          </div>
          <div className="side-comments-scroll single">
            <div className="one-post-cap">
                <img id="profile-img" src={singlePost?.User?.image ? singlePost?.User?.image : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} />
              <b>{singlePost?.User?.username}</b>
            </div>
            <div className="caption-lng"><b>{singlePost?.caption}</b></div>
            <div className="scroll-comments">
              {singlePost?.Comments?.map((comm, index) => {
                return (
                  <div key={index} className="comm-spacing">
                      <img id="profile-img" src={comm.User?.image ? comm.User?.image : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} />
                    <b>{comm?.User?.username}</b>{" "}
                    <p className="break-wrd">{comm?.content}</p>
                    {comm.userId === user.id && (
                      <>
                        <GoTrashcan
                          className="comments-side-icons"
                          onClick={() => dispatch(deleteOneComment(comm))}
                        />
                        <EditComment comm={comm} />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="one-post-likes">
              <p>
                <AddLikes postId={singlePost?.id} />
              </p>
              <p>{singlePost?.Likes?.length} Likes</p>
              <p>
                <AddDislikes postId={singlePost?.id} />
              </p>
              <p>{singlePost?.Dislikes?.length} Dislikes</p>
            </div>
            <div id="input-wid">
              <PostComment postId={singlePost?.id} userId={user.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
   : <div className="no-content">
   <h2>You must have typed in the wrong url..</h2>
   <p className="return-p">Return to home <Link className="no-content-lnk" to='/'>Here</Link></p>
   </div>} </div>
  );
};

export default SinglePost;
