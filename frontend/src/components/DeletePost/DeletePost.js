import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteSinglePost } from "../../store/posts";
import { NavLink } from "react-router-dom";
import './DeletePost.css';

const DeletePost = ({ postId, closeModal }) => {
  const dispatch = useDispatch();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const deletePost = () => {
    dispatch(deleteSinglePost(postId));
    closeModal();
  };

  return (
    <div>
      {confirmDelete ? (
        <div className="delete-modal-cont">
          <h2 className="delete-title">Are you sure?</h2>
          <button onClick={deletePost} className='post-comment delete'>Delete</button>
        </div>
      ) : (
        <>
          <div className="delete-modal-cont">
            <NavLink className='delete-post-content' to={`/posts/${postId}`}>Go to post</NavLink>
          <button onClick={() => setConfirmDelete(true)} className='post-comment delete' >Delete Post</button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeletePost;
