import React from 'react';
import './home.css';

function home() {
  return (
    <div className='home'>
        <div className='homebox'>
        <h1 className='home-heading'>WELCOME TO THE TASK-TRACKER</h1>
        <a href="/login" className='login-link'>LOGIN</a>
        </div>
    </div>
  )
}

export default home