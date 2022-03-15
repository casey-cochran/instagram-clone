import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector} from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import Modal from 'react-modal';
import './Navigation.css';
import CreatePost from '../CreatePost/CreatePost';




function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
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
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </div>
      <div>
      <button>home icon</button>
      <NavLink to='/post/new' onClick={openModal}>Add New Post</NavLink>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <CreatePost closeModal={closeModal}/>
      </Modal>
      <button>drop menu to logout here</button>
      </div>
    </div>
  );
}

export default Navigation;
