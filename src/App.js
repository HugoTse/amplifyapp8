import React, { useState, useEffect } from "react";
import { Auth, Hub, API, Storage } from 'aws-amplify';
import Amplify from 'aws-amplify';
import config from './aws-exports.js';

Amplify.configure(config);

function App() {

// For midway authentication
const [user, setUser] = useState(null);

// Midway Authentication
useEffect(() => {
  Hub.listen('auth', ({ payload: { event, data } }) => {
    switch (event) {
      case 'signIn':
        console.log(event)
        console.log(data)
        getUser().then(userData => setUser(userData));
        break;
      case 'signOut':
        setUser(null);
        break;
      case 'signIn_failure':
        console.log('Sign in failure', data);
        break;
    }
  });
  getUser().then(userData => setUser(userData));
}, []);

function getUser() {
  return Auth.currentAuthenticatedUser()
    .then(userData => userData)
    .catch(() => console.log('Not signed in'));
}




function getUser() {
  return Auth.currentAuthenticatedUser()
    .then(userData => userData)
    .catch(() => console.log('Not signed in'));
}


  return (
    <div className="App">

    {user ? (
      <>
      <p>
        User is signed in!
      </p>

      {/* Sign out button */}
      <button 
        onClick={() => Auth.signOut()}>Sign Out
      </button>

      </>
    ) : (
      <>
      <p>
        User is not signed in!
      </p>

      <button 
        onClick={() => Auth.federatedSignIn({customProvider: "AmazonFederate"})}>Signin With Midway
      </button>
      
      </>
    )}
   
     
    </div>
  );
}

export default App;
