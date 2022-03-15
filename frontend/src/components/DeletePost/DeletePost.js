import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteSinglePost } from "../../store/posts";
import { useHistory } from "react-router-dom";

const DeletePost = ({postId, closeModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(postId, ' what is this id dammit')

    const deletePost = () => {
        dispatch(deleteSinglePost(postId))
        closeModal()
    }

    return (
        <div>
            <button onClick={deletePost}>Delete</button>
            <h2>hello from modal</h2>
            <h2>hello from modal</h2>
            <h2>hello from modal</h2>
            <h2>hello from modal</h2>
        </div>
    )
}



export default DeletePost;
