import { AiOutlineHeart } from "react-icons/ai";
import { addOneLike, removeOneLike, removeOneDislike } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import './Likes.css';

const AddLikes = ({postId, userId}) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.session.user?.id)
    const userLike = useSelector((state) => state.postsReducer?.Posts[postId]?.Likes)
    const userDislike = useSelector((state) => state.postsReducer?.Posts[postId]?.Dislikes)
    const foundDislike = userDislike?.find((dislike) => dislike.userId === currentUserId)
    const foundLike = userLike?.find((like) => (like?.userId === currentUserId ))
    const handleLike = () => {
        if (!foundLike && !foundDislike){
            dispatch(addOneLike(postId,currentUserId))
        }else if(foundDislike) {
            dispatch(addOneLike(postId,currentUserId))
            dispatch(removeOneDislike(foundDislike.id, postId))
            return;
        }else{
            dispatch(removeOneLike(foundLike.id, postId))
        }
    }

    return (
        <>
            <AiOutlineHeart onClick={handleLike} className={foundLike ? "icons like" : 'icons'} />
        </>
    )
}


export default AddLikes;
