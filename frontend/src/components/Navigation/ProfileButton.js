import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory, Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import './Navigation.css';

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user)
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/login')
  };

  return (
    <>
      <FaUserCircle onClick={openMenu} className='icons'/>

      {showMenu && (
        <div className="profile-dropdown">
          <div className="prof-item">{user.username}</div>
          <div className="prof-item">{user.email}</div>
          <div className='prof-item'>
            <Link className='profile-btn lnk' to={`/users/${currentUser.id}`}>Go to profile</Link>
            </div>
          <div className="prof-item">
            <button className='profile-btn' onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
