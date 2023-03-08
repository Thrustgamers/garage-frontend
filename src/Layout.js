import React from 'react';
import './assets/main.css';
import { useSelector } from 'react-redux'

import Auth from './pages/login';
import Dashboard from './pages/dashboard';

export default function App() {
  
  const employeeId = useSelector(state => state.userState.employeeId)
  const name = useSelector(state => state.userState.name)

  console.log(name)
  console.log(employeeId)

  return (
    <div>
        {name == null && employeeId == null &&
          <Auth />
        }
        {name != null && employeeId != null &&
          <Dashboard />        
        }    
    </div>
  );
}