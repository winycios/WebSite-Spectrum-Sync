import React from 'react';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import Rota from './routes'

import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';

import 'react-toastify/dist/ReactToastify.css';
import "./utils/globals.css"
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="865214662724-3rj0k632ni3008m2mav82o3tepafq3il.apps.googleusercontent.com">
    <React.StrictMode>
      <RouterProvider router={Rota} />
      <ToastContainer />
    </React.StrictMode>
  </GoogleOAuthProvider>
);