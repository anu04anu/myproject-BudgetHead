import React, { useState } from 'react'
import Logo from '../img/iet-logo.png';
import './TopBody.css';
import ResetSession from './ResetSession';

function TopBody({handleLogout,navigateToPage,user,setSession}) {

    const [showSessionModel, setShowSessionModel] = useState(false);
  
    return (
    <>
        <div className='topBody-header'>
            <img src={Logo} alt={Logo} className='topBody-header-logo'/>
            <span className='topBody-header-heading'>Budget Head Manager</span>
            <div className='topBody-header-rightoptions'>
                {user==='director' && (<div className='topBody-reset-session' 
                    onClick={()=>{setShowSessionModel(true)}}>Reset session</div>
                )}
                <button className='topBody-logout-button' onClick={handleLogout}>{user==''?'Log In':'Log Out'}</button>
            </div>
        </div>
        {showSessionModel && <ResetSession setShowSessionModel={setShowSessionModel} setSession={setSession}/>}
        <div className='topBody-body'>
            <div className='topBody-body-left'>
                <div className='topBody-welcome'>Welcome</div>
                <div className='topBody-tagline'>Add, Update and View budget.</div>
                <div className='topBody-navigation'>
                    <button onClick={()=>{ alert('This will show report, done by another friend.')}} className='topBody-navigation-item'>View Report</button>
                    {user!=='director' && user!=='' && <button onClick={()=>{navigateToPage(2);}} className='topBody-navigation-item'>Update Details</button>}
                </div>
            </div>
        </div>
    </>
  )
}

export default TopBody