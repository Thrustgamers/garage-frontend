import React from 'react';
import './assets/main.css';
import { useSelector } from 'react-redux'

import Auth from './pages/login';
import Dashboard from './pages/dashboard';

export default function App() {
  
  const loggedIn = useSelector(state => state.userState.loggedIn)

  return (
    <div>
        {!loggedIn &&
          <Auth />
        }
        {loggedIn &&
          <Dashboard />        
        }    
    </div>
  );
}