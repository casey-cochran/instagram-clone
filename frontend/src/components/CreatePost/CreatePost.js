import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createUserPost } from "../../store/posts";
import "./CreatePost.css";

const CreatePost = ({ closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);

  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [errors, setErrors] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = {
      userId,
      image,
      caption,
    };
    const value = await dispatch(createUserPost(post)).catch(async (err) => {
      const errors = await err.json();
      if (errors) {
        return errors;
      }
    });
    if (value?.errors) {
      return setErrors(value?.errors);
    }

    closeModal();
  };

  return (
    <div>
      {openForm ? (
        <div>
          <img id="testimg" src={image} />
          <form onSubmit={handleSubmit}>
            <ul>
              {errors?.map((error, index) => {
               return <li key={index}>{error}</li>;
              })}
            </ul>
            <div>
              <label htmlFor="caption">Caption</label>
              <input
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
                type="text"
                id="caption"
              />
            </div>
            <button type="submit">Add New Post</button>
          </form>
         {errors.length > 0 && <button onClick={() => setOpenForm(false)}>Go back to add image</button> }
        </div>
      ) : (
        <div>
          <h3>Create new post</h3>
          <form>
            <div>
              <label htmlFor="image">Image link</label>
              <input
                onChange={(e) => setImage(e.target.value)}
                value={image}
                required
                type="url"
                id="image"
              />
            </div>
            <button onClick={() => setOpenForm(true)}>Add Image</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
