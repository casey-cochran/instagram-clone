import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {


    return(
        <>
        <div className="no-content">
   <h2>You must have typed in the wrong url..</h2>
   <p className="return-p">Return to home <Link className="no-content-lnk" to='/'>Here</Link></p>
   </div>
   </>
    )
}


export default PageNotFound;
