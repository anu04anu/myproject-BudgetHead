import React, { useState } from 'react';
import './ResetSession.css';

function ResetSession({setShowSessionModel,setSession}) {
  const [isPending, setIsPending] = useState(false);

  {console.log('session')};

  //API calling for Session Reset
  const handleResetSession = async() => {
    try {
      setIsPending(true);
      /*const response = await fetch('/some-api', { method: 'POST', body:'reset-session !'});

      if(!response.ok) {
        throw new Error('Could not update session.');
      }*/
      setIsPending(false);
      setSession(''); 
      setShowSessionModel(false);

    } catch(error) {
      console.log(error);
      setIsPending(false);
      setShowSessionModel(false);
    }
  }
  
  return (
    <div className='reset-session'>
        <div className='reset-session-box'>
            <div className='reset-session-heading1'>ALERT !!!</div>
            <div className='reset-session-heading2'>The session will get update to next year.</div>
            <span>All the entries will get reset.</span>
            <div className='session-options'>
              { !isPending && <button className='reset-session-cancelbtn' onClick={()=>{setShowSessionModel(false)}}>
                Cancel </button>}
              { !isPending && <button className='reset-session-updatebtn' 
                onClick={handleResetSession}>Update</button>}
              { isPending && <button className='reset-session-updatebtn' >Updating</button>}
            </div>
        </div>
    </div>
  )
}

export default ResetSession