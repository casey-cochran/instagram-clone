import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import HomeFeed from './components/HomeFeed/HomeFeed';
import DeletePost from './components/DeletePost/DeletePost';
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
          <Route path='/signup' exact={true}>
            <SignupFormPage />
          </Route>
          <Route path='/' exact={true}>
            <HomeFeed />
          </Route>
          {/* <Route path='/posts/:postId' exact={true} >
            <DeletePost />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
