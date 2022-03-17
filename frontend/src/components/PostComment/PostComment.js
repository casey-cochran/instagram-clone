import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSingleComment } from "../../store/comments";

const PostComment = ({postId, userId}) => {
 const dispatch = useDispatch();
 const [content, setContent] = useState('')
 const [errors, setErrors] = useState([])


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
      <p>emoji</p>
      <form onSubmit={handleSubmit}>
      <input
        className="home-comment sidebar"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder={errors ? errors : 'Add a comment'}
        type="text"
      />
      <button type='submit'>Post</button>
      </form>
    </div>
  );
};

export default PostComment;
