import { useState } from "react";
import { useDispatch } from "react-redux";
import './EditProfile.css';



const EditProfile = ({user, closeModal}) => {
console.log('what is ', user)

const [bio, setBio] = useState(user?.bio)
const [image, setImage] = useState('')
const [errors, setErrors] = useState('')

let buttonClass = ''
if(bio || image){
  buttonClass = 'post-comment'
}else {
    buttonClass = 'post-comment-disabled'
}


    return (
        <div className="prof-edit-cont">
            <div>
                <img className="prof-edit-image" src={
              user?.image
                ? user?.image
                : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            } />
            </div>
            <form className="prof-edit-form">
                <input
                onChange={((e) => setBio(e.target.value))}
                value={bio}
                type='text'
                placeholder="Add Bio"
                className="create-post-input edit"
                />
                <input
                onChange={((e) => setImage(e.target.value))}
                value={image}
                type='url'
                placeholder="Add profile image"
                className="create-post-input edit"
                />
                <button disabled={bio || image ? false : true} className={buttonClass} type='submit'>Edit</button>
            </form>
        </div>
    )
}



export default EditProfile;
