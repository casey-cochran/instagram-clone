import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editOneComment} from "../../store/comments";
import { FiEdit2 } from 'react-icons/fi';
import './EditComment.css';



const EditComment = ({comm}) => {
    const dispatch = useDispatch();
    const [test, setTest] = useState(false)
    const [edit, setEdit] = useState(comm.content)
    const [error, setErrors] = useState('')
    const {userId, postId} = comm



    const handleSubmit = async(e) => {
        e.preventDefault()
        comm.content=edit
        if(!edit) {
          return setErrors('Must provide content')
        }

        const value = await dispatch(editOneComment(comm)).catch(async (err) => {
            const errors = await err.json();
            if (errors) {
              return errors;
            }
          });
          if (value?.errors) {
            setEdit('')
            return setErrors(value?.errors);
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
            className="one-post-input"
            onChange={((e) => setEdit(e.target.value))}
            value={edit}
            type='text'
            placeholder={error}
            />
          <button className="post-comment one" type='submit'>Edit</button> 
            </form>
        }
        </>
    )
}



export default EditComment;
