import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUserPost } from "../../store/posts";
import "./CreatePost.css";

const CreatePost = ({ closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);

  const [src, setSrc] = useState('')
  const [image, setImage] = useState(null);
  const [test,setTest] = useState(false)
  const [caption, setCaption] = useState("");
  const [errors, setErrors] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    // const validateImage = /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|svg|avif)(\?(.*))?$/.test(image);
    // if(validateImage){
    //   setErrors([])
      setOpenForm(true)
    // }else{
    //   const newErrors = [];
    //   newErrors.push('Valid image URL must contain jpg, jpeg, png, bmp, avif, gif, or svg')
    //   setErrors(newErrors)
    // }
  };


  let buttonClass = "";
  let createImageClass = "";
  if (image) {
    buttonClass = "post-comment";
  } else {
    buttonClass = "post-comment-disabled";
  }
  if (caption) {
    createImageClass = "post-comment";
  } else {
    createImageClass = "post-comment-disabled";
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

  const updateFile = (e) => {
    if (e.target.files && e.target.files[0]) {
       setSrc(URL.createObjectURL(e.target.files[0]))
    }
    const file = e.target.files[0];
    if (file) setImage(file);
    console.log(file, ' what is the file ?')
  }

  const isImageReal = () => {
    setImage("https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png")
    setTest(true)
  }

  const didLoad = () => {
    setTest(true)
  }
  return (
    <div>
      {openForm ? (
        <div className="create-post-cont">
          <img className="add-img" src={src}  />
          {/* {!test && <p>Please wait while image is being verified</p>} */}
          {image === "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" && <div><p className="not-veri">Image not verified</p> <button className="post-comment" onClick={() => setOpenForm(false)}>
              Go back to add image
            </button></div>}
            {/* {image && */}
          <form className="create-post-form" onSubmit={handleSubmit}>
            <div>
              {image !== "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" &&
              <input
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
                type="text"
                id="caption"
                placeholder="Add caption"
                className="create-post-input"
              />
            }
            </div>
 <button
              onClick={() => setOpenForm(true)}
              disabled={caption ? false : true}
              className={createImageClass}
              type="submit"
            >
              Add image
            </button>
          </form>
          <div>
            {errors?.map((error, index) => {
              return <div key={index}>{error}</div>;
            })}
          </div>
          {errors.length > 0 && (
            <button className="post-comment" onClick={() => setOpenForm(false)}>
              Go back to add image
            </button>
          )}
        </div>
      ) : (
        <div className="create-post-cont">
          <h3 className="create-post-title">Create new post</h3>
          <img
            className="create-post-icon"
            src="https://www.cera.org.au/wp-content/uploads/2021/06/placeholder-images-image_large.png"
          />
          <form className="create-post-form">
            <div>
              <input
                onChange={updateFile}
                // value={image}
                required
                type="file"
                id="image"
                accept="image/bmp,image/jpeg,image/png,image/gif"
                placeholder="Add image url"
                className="create-post-input"
              />
            </div>
            <button
              onClick={handleClick}
              disabled={image ? false : true}
              className={buttonClass}
            >
              Add image
            </button>
          </form>
          {errors?.map((error, index) => {
              return <div key={index}>{error}</div>;
            })}
        </div>
      )}
    </div>
  );
};

export default CreatePost;
