import { useDispatch, useSelector } from "react-redux";
import {  useState } from "react";
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

  let buttonClass = ''
  let createImageClass = ''
 if(image){
   buttonClass = 'post-comment'
 }else {
  buttonClass = 'post-comment-disabled'
}
if(caption){
  createImageClass = 'post-comment'
}else {
  createImageClass = 'post-comment-disabled'
}


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
    <div >
      {openForm ? (
        <div className="create-post-cont">
          <img id="add-img" src={image} />
          <form className="create-post-form" onSubmit={handleSubmit}>
            <ul>
              {errors?.map((error, index) => {
               return <li key={index}>{error}</li>;
              })}
            </ul>
            <div>
              <input
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
                type="text"
                id="caption"
                placeholder="Add caption"
                className="create-post-input"
              />
            </div>
            <button onClick={() => setOpenForm(true)} disabled={caption ? false : true} className={createImageClass} type='submit'>Add image</button>

          </form>
         {errors.length > 0 && <button onClick={() => setOpenForm(false)}>Go back to add image</button> }
        </div>
      ) : (
        <div className="create-post-cont">
          <h3 className="create-post-title">Create new post</h3>
          {/* <BiImage className="create-post-icon"/> */}
          <img className="create-post-icon" src='https://www.cera.org.au/wp-content/uploads/2021/06/placeholder-images-image_large.png' />
          <form className="create-post-form">
            <div>
              <input
                onChange={(e) => setImage(e.target.value)}
                value={image}
                required
                type="url"
                id="image"
                placeholder="Add image url"
                className="create-post-input"
              />
            </div>
            <button onClick={() => setOpenForm(true)} disabled={image ? false : true} className={buttonClass} type='submit'>Add image</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
