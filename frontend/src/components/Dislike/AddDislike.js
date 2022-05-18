import {GoThumbsdown} from 'react-icons/go';
import { addOneDislike, removeOneDislike, removeOneLike } from '../../store/posts';
import { useDispatch, useSelector } from "react-redux";
import './Dislike.css';


const AddDislikes = ({postId}) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.session.user?.id)
    const userDislike = useSelector((state) => state.postsReducer?.Posts[postId]?.Dislikes)
    const userLike = useSelector((state) => state.postsReducer?.Posts[postId]?.Likes)
    const foundDislike = userDislike?.find((dislike) => (dislike?.userId === currentUserId ))
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

    let handleDisLike = () => {
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

    handleDisLike = debounce(handleDisLike, 200)

    return (
        <>
            <GoThumbsdown onClick={handleDisLike} className={foundDislike ? "icons dislike" : 'icons'} />
        </>
    )
}


export default AddDislikes;
