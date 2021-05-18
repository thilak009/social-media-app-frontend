import React from 'react'
import Signin from './components/Signin';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute';
import Home from './components/Home';
import Signup from './components/Signup';
//import Profile from './components/Profile';
import UserProfile from './components/UserProfile';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/signin' component={Signin}></Route>
        <Route exact path='/signup' component={Signup}></Route>
        <PrivateRoute exact path='/' component={Home}></PrivateRoute>
        {/* <PrivateRoute exact path="/profile" component={UserProfile}></PrivateRoute> */}
        <PrivateRoute exact path="/profile/:userId" component={UserProfile}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;

