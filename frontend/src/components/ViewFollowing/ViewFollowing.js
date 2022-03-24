import { Link } from 'react-router-dom';
import {FaUserCircle} from 'react-icons/fa';
import {RiEmotionSadLine} from 'react-icons/ri';



const ViewFollowing = ({following, closeModal}) => {


    return (
        <>
        <div className='view-follows-cont'>
            {following?.length > 0 ? <>
            {following?.map((ele, index) => {
                return <div className='view-follows' key={index}>
                      <img className="followers-img" src={ele.image ? ele.image : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} />
                    <Link className='follows-link' to={`/users/${ele.id}`} onClick={closeModal}>
                    {ele.username}
                    </Link>
                </div>
            })}
     </> : <div className='no-follows'>
         <h2>
         User is not following anyone
             </h2>
         <div><RiEmotionSadLine className='no-follow-icon'/></div>
             </div>  }
        </div>
        </>
    )

}


export default ViewFollowing;
