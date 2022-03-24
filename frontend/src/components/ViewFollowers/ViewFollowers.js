import { Link } from 'react-router-dom';
import {FaUserCircle} from 'react-icons/fa';
import {RiEmotionSadLine} from 'react-icons/ri';
import './ViewFollowers.css';



const ViewFollowers = ({follow, closeModal}) => {


    return (
        <>
        <div className='view-follows-cont'>
            {follow?.length > 0 ? <>
            {follow?.map((ele, index) => {
                return <div className='view-follows' key={index}>
                      <img className="followers-img" src={ele.image ? ele.image : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} />
                    <Link className='follows-link' to={`/users/${ele.id}`} onClick={closeModal}>
                    {ele.username}
                    </Link>
                </div>
            })}
     </> : <div className='no-follows'>
         <h2>
         User has no followers
             </h2>
         <div><RiEmotionSadLine className='no-follow-icon'/></div>
             </div>  }
        </div>
        </>
    )
}



export default ViewFollowers;
