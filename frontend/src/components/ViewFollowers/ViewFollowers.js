import { Link } from 'react-router-dom';
import {FaUserCircle} from 'react-icons/fa';
import {RiEmotionSadLine} from 'react-icons/ri';
import './ViewFollowers.css';



const ViewFollowers = ({follow, closeModal}) => {
    console.log(follow, ' what is following ?')

    return (
        <>
        <div className='view-follows-cont'>
            {follow?.length > 0 ? <>
            {follow?.map((ele, index) => {
                return <div className='view-follows' key={index}>
                    {ele?.image ? (
                      <img className="followers-img" src={ele.image} />
                    ) : (
                      <FaUserCircle className="icons" />
                    )}

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
