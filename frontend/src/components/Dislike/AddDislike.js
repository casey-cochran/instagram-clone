import {GoThumbsdown} from 'react-icons/go';
import { addOneDislike, removeOneDislike } from '../../store/posts';
import { useDispatch, useSelector } from "react-redux";
import './Dislike.css';


const AddDislikes = ({postId, userId}) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.session.user.id)
    const userDislike = useSelector((state) => state.postsReducer?.Posts[postId]?.Dislikes)
    const foundDislike = userDislike?.find((dislike) => (dislike?.userId === currentUserId ))
    const handleLike = () => {
        if (!foundDislike){
            dispatch(addOneDislike(postId,currentUserId))
        }else{
            dispatch(removeOneDislike(foundDislike.id, postId))
        }
    }

    return (
        <>
            <GoThumbsdown onClick={handleLike} className={foundDislike ? "icons dislike" : 'icons'} />
        </>
    )
}


export default AddDislikes;
