import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editOneComment } from "../../store/comments";




const EditComment = ({comm}) => {
    const dispatch = useDispatch();
    const [test, setTest] = useState(false)
    const [edit, setEdit] = useState(comm?.content)

    const handleSubmit = async(e) => {
        e.preventDefault()
        comm.content=edit
        const value = await dispatch(editOneComment(comm)).catch(async (err) => {
            const errors = await err.json();
            if (errors) {
              return errors;
            }
          });
          if (value?.errors) {
            return setEdit(value?.errors);
          }
          setEdit('');
    }

    return (
        <>
        <button onClick={() => setTest(!test)}>edit</button>
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
