import {GoThumbsdown} from 'react-icons/go';
import { addOneDislike, removeOneDislike, removeOneLike } from '../../store/posts';
import { useDispatch, useSelector } from "react-redux";
import './Dislike.css';


const AddDislikes = ({postId, userId}) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.session.user?.id)
    const userDislike = useSelector((state) => state.postsReducer?.Posts[postId]?.Dislikes)
    const userLike = useSelector((state) => state.postsReducer?.Posts[postId]?.Likes)
    const foundDislike = userDislike?.find((dislike) => (dislike?.userId === currentUserId ))
    const foundLike = userLike?.find((like) => (like?.userId === currentUserId ))
    const handleLike = () => {
        if (!foundDislike && !foundLike){
            dispatch(addOneDislike(postId,currentUserId))
        }else if(foundLike){
            dispatch(addOneDislike(postId, currentUserId))
            dispatch(removeOneLike(foundLike.id, postId))
            return
        } else{
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
