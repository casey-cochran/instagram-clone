import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editSinglePost } from "../../store/posts";
import './Editpost.css';

const EditPost = ({ postId, closeModal, postImg }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const post = useSelector((state) => state.postsReducer.Posts[postId])
  const [caption, setCaption] = useState("");
  const [errors, setErrors] = useState([]);
  let buttonClass = '';
  if(caption){
    buttonClass = 'post-comment'
  }else {
    buttonClass = 'post-comment-disabled'
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      caption,
      postId,
    };

    const value = await dispatch(editSinglePost(updatedPost)).catch(
      async (err) => {
        const errors = await err.json();
        if (errors) {
          return errors;
        }
      }
    );
    if (value?.errors) {
      return setErrors(value?.errors);
    }

    closeModal();
  };

  return (
    <div className="edit-post-cont">
      <h2 className="edit-post-title">Edit post</h2>
      <img className="add-img edit" src={post?.image} />
      <form className='edit-post-form' onSubmit={handleSubmit}>
        <ul>
          {errors?.map((error, index) => {
            return <li key={index}>{error}</li>;
          })}
        </ul>
        <input
          onChange={(e) => setCaption(e.target.value)}
          type="text"
          value={caption}
          placeholder={post?.caption}
          className='edit-post-input'
        />
        <button className={buttonClass} type="submit">Submit Edit</button>
      </form>
    </div>
  );
};

export default EditPost;
