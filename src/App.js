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


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path='/signin' component={Signin}></Route>
        <Route exact path='/signup' component={Signup}></Route>
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

