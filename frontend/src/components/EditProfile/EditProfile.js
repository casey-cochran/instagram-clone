import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile } from "../../store/posts";
import './EditProfile.css';



const EditProfile = ({user, closeModal}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user)

const [bio, setBio] = useState(currentUser?.bio ? currentUser?.bio : 'Add a bio')
const [src, setSrc] = useState('')
const [image, setImage] = useState(currentUser?.image ? currentUser?.image : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png")
const [errors, setErrors] = useState('')

let buttonClass = ''
if(bio || image){
  buttonClass = 'post-comment'
}else {
    buttonClass = 'post-comment-disabled'
}

const handleSubmit = async(e) => {
    e.preventDefault();

    // const validateImage = /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|svg|avif)(\?(.*))?$/.test(image);
    // if(validateImage || !image){
    //     setImage(currentUser?.image)
    //   setErrors([])
    // }else{
    //   const newErrors = [];
    //   newErrors.push('Valid image URL must contain jpg, jpeg, png, bmp, avif, gif, or svg')
    //  return setErrors(newErrors)
    // }

    const userEdit = {
        userId: currentUser.id,
        image,
        bio
    }
    const value = await dispatch(editUserProfile(userEdit)).catch(async(err) => {
        const errors = await err.json();
        if(errors){
            return errors
        }
    })
    if(value?.errors){
      return  setErrors(value.errors)
    }
    setImage(image)
    closeModal();
}

const updateFile = (e) => {
    if (e.target.files && e.target.files[0]) {
       setSrc(URL.createObjectURL(e.target.files[0]))
       setImage(src)
    }
    const file = e.target.files[0];
    if (file) setImage(file);
  }


    return (
        <div className="prof-edit-cont">
            <div>
            <h2 id='edit-prof-header'>Edit Profile</h2>
                <img className="prof-edit-image" src={
              currentUser?.image
                ? currentUser?.image
                : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            } />
            </div>
            {errors.length > 0 && errors.map((error, index) => {
                return <div key={index}>{error}</div>
            })}
            <form onSubmit={handleSubmit} className="prof-edit-form">
                <input
                onChange={((e) => setBio(e.target.value))}
                value={bio}
                type='text'
                placeholder="Add Bio"
                className="create-post-input edit"
                />
                <input
                onChange={updateFile}
                // value={image}
                accept="image/bmp,image/jpeg,image/png,image/gif"
                type='file'
                placeholder="Add profile image"

                />
                <button disabled={bio || image ? false : true} className={buttonClass} type='submit'>Edit</button>
            </form>
        </div>
    )
}



export default EditProfile;
