import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { isAuthenticated } from '.';


function UserCheckRoute({ component: Component, ...rest }) {
  
    return (
      <Route
        {...rest}
        render={props =>
           isAuthenticated() ? (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          ) : (
            <Component {...props}/>
          )
        }
      />
    );
  }

  export default UserCheckRoute;