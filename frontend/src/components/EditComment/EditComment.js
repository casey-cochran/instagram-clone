import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editOneComment } from "../../store/comments";
import { FiEdit2 } from 'react-icons/fi';




const EditComment = ({comm}) => {
    const dispatch = useDispatch();
    const [test, setTest] = useState(false)

    const testing = useSelector((state) => state.postsReducer.Posts[comm.postId].Comments)
    const found = testing.find((com => com.id === comm.id))
    // console.log(found, ' new test')
    const [edit, setEdit] = useState(comm.content)
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
          // setEdit('');
          setTest(false);
    }

    return (
        <>
        <FiEdit2 className="comments-side-icons" onClick={() => setTest(!test)} />
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
