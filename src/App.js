import React from 'react'
import Signin from './components/Signin';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute';
import Home from './components/Home';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import PageNotFound from './components/PageNotFound';
import Chat from './components/Chat';
import Comments from './components/Comments';
import UserCheckRoute from './auth/UserCheckRoute';


function App() {

  return (
    <Router>
      <Switch>
        <UserCheckRoute exact path='/signin' component={Signin}></UserCheckRoute>
        <UserCheckRoute exact path='/signup' component={Signup}></UserCheckRoute>
        <PrivateRoute exact path='/' component={Home}></PrivateRoute>
        <PrivateRoute exact path="/profile/:userId" component={UserProfile}></PrivateRoute>
        <PrivateRoute exact path="/:userId/chat" component={Chat}></PrivateRoute>
        <PrivateRoute exact path="/:userId/post/:postId" component={Comments}></PrivateRoute>
        <Route path="*" component={PageNotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;

