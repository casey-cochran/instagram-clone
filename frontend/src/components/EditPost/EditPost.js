import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editSinglePost, deleteSinglePost } from "../../store/posts";
import { useHistory } from "react-router-dom";
import './Editpost.css';

const EditPost = ({ postId, closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);
  const post = useSelector((state) => state.postsReducer.Posts[postId])
  const [caption, setCaption] = useState(post?.caption);
  const [errors, setErrors] = useState([]);
  const [deletePost, setDeletePost] = useState(false);
  const [placeholder, setPlaceholder] = useState('Please provide a caption')

  const removePost = () => {
    dispatch(deleteSinglePost(postId))
    history.push(`/users/${userId}`)
  }

  let buttonClass = '';
  if(caption){
    buttonClass = 'post-comment'
  }else {
    buttonClass = 'post-comment-disabled'
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(deletePost) return;
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
      setCaption('')
      return setPlaceholder(value?.errors);
    }

    closeModal();
  };

  return (
    <>
    {!deletePost ?
    <div className="edit-post-cont">
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
          placeholder={placeholder}
          className='edit-post-input'
        />
        <button className={buttonClass} disabled={caption ? false: true} type="submit">Submit Edit</button>
        {+userId === post?.userId &&
        <button onClick={(() => setDeletePost(true))} className="delete-one-post">Delete post</button>
        }
      </form>
    </div>
    : <div className="edit-post-cont">
      {/* <h2 className="edit-post-title"> Delete Post</h2> */}
      <img className="add-img edit" src={post?.image} />
      <h3>Are you sure ?</h3>
      <div>
        <button className="confirm-btns mg" onClick={(() => setDeletePost(false))}>Cancel</button><button onClick={removePost} className="confirm-btns">Confirm Delete</button>
      </div>
       </div> }
    </>
  );
};

export default EditPost;
