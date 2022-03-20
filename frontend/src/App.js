import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import HomeFeed from './components/HomeFeed/HomeFeed';
import DeletePost from './components/DeletePost/DeletePost';
import SinglePost from './components/SinglePost/SinglePost';
import LoginForm from './components/LoginFormModal/LoginForm';
import EditComment from './components/EditComment/EditComment';
import UserProfile from './components/UserProfile/UserProfile';
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session?.user)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {user && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginForm />
          </Route>
          <Route path='/signup' exact={true}>
            <SignupFormPage />
          </Route>
          <Route path='/' exact={true}>
            <HomeFeed />
          </Route>
          <Route path='/posts/:postId' exact={true} >
            <SinglePost />
          </Route>
          <Route path='/users/:userId' exact={true}>
            <UserProfile />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
