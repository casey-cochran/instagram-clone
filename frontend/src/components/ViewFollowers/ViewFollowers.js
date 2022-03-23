import { Link } from 'react-router-dom';
import './ViewFollowers.css';



const ViewFollowers = ({follow, closeModal}) => {
    console.log(follow, ' what is following ?')

    return (
        <>
        <div className='view-follows-cont'>
            {follow?.map((ele, index) => {
                return <div className='view-follows' key={index}>
                    <img className="followers-img" src={ele.image} />
                    <Link className='follows-link' to={`/users/${ele.id}`} onClick={closeModal}>
                    {ele.username}
                    </Link>
                </div>
            })}
        </div>
        </>
    )
}



export default ViewFollowers;
