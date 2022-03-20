import { AiOutlineHeart } from "react-icons/ai";
import { addOneLike, removeOneLike } from "../../../store/posts";
import { useDispatch, useSelector } from "react-redux";

const AddLikes = ({postId, userId}) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.session.user.id)
    const userLike = useSelector((state) => state.postsReducer?.Posts[postId]?.Likes)
    const foundLike = userLike?.find((like) => (like?.userId === currentUserId ))
    const handleLike = () => {
        if (!foundLike){
            dispatch(addOneLike(postId,currentUserId))
        }else{
            dispatch(removeOneLike(foundLike.id, postId))
        }
    }

    return (
        <>
            <AiOutlineHeart onClick={handleLike} className="icons" />
        </>
    )
}


export default AddLikes;
