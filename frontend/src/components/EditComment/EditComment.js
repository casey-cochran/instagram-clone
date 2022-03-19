import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editOneComment, findOneComment } from "../../store/comments";
import { FiEdit2 } from 'react-icons/fi';




const EditComment = ({comm}) => {
    const dispatch = useDispatch();
    const [test, setTest] = useState(false)
    const testing = useSelector((state) => state.postsReducer.Posts[comm.postId].Comments)
    const found = testing.find((com => com.id === comm.id))
    const [edit, setEdit] = useState(found.content)



    const handleSubmit = async(e) => {
        e.preventDefault()
        found.content=edit
        const value = await dispatch(editOneComment(found)).catch(async (err) => {
            const errors = await err.json();
            if (errors) {
              return errors;
            }
          });
          if (value?.errors) {
            return setEdit(value?.errors);
          }
           setEdit(value?.content);
          setTest(false);
    }



    return (
        <>
        <FiEdit2 className="comments-side-icons" onClick={() => {setTest(!test)
           setEdit(comm.content)}} />
        {test &&
            <form onSubmit={handleSubmit}>
            <input
            onChange={((e) => setEdit(e.target.value))}
            value={edit}
            type='text'
            />
            <button type='submit'>submit</button>
            </form>
        }
        </>
    )
}



export default EditComment;
