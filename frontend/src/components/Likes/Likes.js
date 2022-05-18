import { AiOutlineHeart } from "react-icons/ai";
import { addOneLike, removeOneLike, removeOneDislike } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import './Likes.css';

const AddLikes = ({postId}) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.session.user?.id)
    const userLike = useSelector((state) => state.postsReducer?.Posts[postId]?.Likes)
    const userDislike = useSelector((state) => state.postsReducer?.Posts[postId]?.Dislikes)
    const foundDislike = userDislike?.find((dislike) => dislike.userId === currentUserId)
    const foundLike = userLike?.find((like) => (like?.userId === currentUserId ))

    const debounce = (cb, delay) => {
        let t = null;
        return function(...args) {
          clearTimeout(t);
          t = setTimeout(() => {
            cb(...args)
          }, delay)
        }
      }

    let handleLike = () => {
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

    handleLike = debounce(handleLike, 200);

    return (
        <>
            <AiOutlineHeart onClick={handleLike} className={foundLike ? "icons like" : 'icons'} />
        </>
    )
}


export default AddLikes;
