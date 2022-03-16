import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editSinglePost } from "../../store/posts";

const EditPost = ({ postId, closeModal, postImg }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);

  const [caption, setCaption] = useState("");
  const [errors, setErrors] = useState([]);

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
    <div>
      <h2>Edit post</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors?.map((error, index) => {
            return <li key={index}>{error}</li>;
          })}
        </ul>
        <label htmlFor="caption">Caption</label>
        <input
          onChange={(e) => setCaption(e.target.value)}
          type="text"
          value={caption}
        />
        <button type="submit">Submit Edit</button>
      </form>
    </div>
  );
};

export default EditPost;
