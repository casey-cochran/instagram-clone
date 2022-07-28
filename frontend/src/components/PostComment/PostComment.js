import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSingleComment } from "../../store/comments";
import { BsEmojiSmile } from 'react-icons/bs';
import './PostComment.css';

const PostComment = ({postId, userId, inputId}) => {
 const dispatch = useDispatch();
 const [content, setContent] = useState('')
 const [errors, setErrors] = useState([])
 let buttonClass = ''
 if(content){
   buttonClass = 'post-comment'
 }else {
  buttonClass = 'post-comment-disabled'
}


 const handleSubmit = async(e) => {
     e.preventDefault();

     const comment = {
        postId,
        userId,
        content
    }
    const value = await dispatch(addSingleComment(comment)).catch(async (err) => {
        const errors = await err.json();
        if (errors) {
          return errors;
        }
      });
      if (value?.errors) {
        return setErrors(value?.errors);
      }
      setContent('');
 }



  return (
    <div className="add-comment sidebar">
      <p><BsEmojiSmile /></p>
      <form onSubmit={handleSubmit}>
      <input
        className="home-feed-input modal"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        autoFocus
        placeholder={errors.length > 0 ? errors : 'Add a comment'}
        type="text"
      />
      <button disabled={content ? false : true} className={buttonClass} type='submit'>Post</button>
      </form>
    </div>
  );
};

export default PostComment;
