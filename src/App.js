import './App.css';

import LoginButton from './components/login';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId = PermissionStatus.REACT_APP_CLIENT_ID;

function App() {
  useEffect(() =>{
    function start() {
      gapi.client.init({
          clientId : clientId,
          scope: ""
        })
      };
      gapi.load('client:auth2', start)
    });
    

  return (
    <div className='App'>
        <LoginButton/>
    </div>
  )
}

export default App;
