import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteSinglePost } from "../../store/posts";
import { NavLink } from "react-router-dom";

const DeletePost = ({postId, closeModal}) => {
    const dispatch = useDispatch();

    const [confirmDelete, setConfirmDelete] = useState(false)

    const deletePost = () => {
        dispatch(deleteSinglePost(postId))
        closeModal()
    }

    return (
        <div>
            {confirmDelete ? <>
            <button onClick={deletePost}>Delete</button>
            <h2>Are you sure?</h2>
            </>
            : <>
            <button onClick={(() => setConfirmDelete(true))}>Delete</button>
            <div><NavLink to={`/posts/${postId}`}>Go to post</NavLink></div>
            <h2>hello from modal</h2>
            <h2>hello from modal</h2>
            <h2>hello from modal</h2>
            </>
             }
        </div>
    )
}



export default DeletePost;
