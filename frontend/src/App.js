import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import PageNotFound from './components/PageNotFound/PageNotFound';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import HomeFeed from './components/HomeFeed/HomeFeed';
import SinglePost from './components/SinglePost/SinglePost';
import LoginForm from './components/LoginFormModal/LoginForm';
import UserProfile from './components/UserProfile/UserProfile';
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
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
          <Route path='/post/new'></Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
