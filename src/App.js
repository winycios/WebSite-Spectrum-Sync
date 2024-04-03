import './App.css';

import LoginButton from './components/login';
import LogoutButton from './components/logout';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId = '636146546883-fi2hg7utp4h0uu6ki3lgt4mdi3nj08m0.apps.googleusercontent.com';

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
        <LogoutButton/>
    </div>
  )
}

export default App;
