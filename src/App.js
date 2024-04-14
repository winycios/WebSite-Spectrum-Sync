import './App.css';

import CadastroSpring from './components/login';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

import Login from './components/CadastroSpring';
import LoginSpring from './components/LoginSpring.js';
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
        <CadastroSpring/>
        <Login/>
        <LoginSpring/>
    </div>
  )
}

export default App;
