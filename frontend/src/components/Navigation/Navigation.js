import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector} from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import Modal from 'react-modal';
import './Navigation.css';
import CreatePost from '../CreatePost/CreatePost';
import { MdHomeFilled } from 'react-icons/md';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import Search from '../../Search/Search';



function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      width: '450px',
      height: '450px',
      padding: '0px',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  };
  function closeModal() {
    setIsOpen(false);
    history.push('/');
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div id='nav-cont'>
      <div>
        <NavLink className='home-title name' exact to="/">Memories</NavLink>
        {/* {isLoaded && sessionLinks} */}
      </div>
      <Search />
      <div className='up-r-icons'>
      <NavLink to='/'><MdHomeFilled className='icons home-title' /></NavLink>
      <NavLink to='/post/new' onClick={openModal}><AiOutlinePlusSquare className='icons home-title' /></NavLink>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}

      >
        <CreatePost closeModal={closeModal}/>
      </Modal>
      {/* <FaUserCircle className='icons'/> */}
      {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
