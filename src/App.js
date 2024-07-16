import './App.css';
import React, { useState,useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const navigate = useNavigate();
  const [user,setUser] = useState('');

  /*  headList data structure => {
          headName1 : [sanctionedAmt,[ {key1: [service/item, description, amount, Eid, date/time, invoice-no., payment date]}, 
                                        {key2:[service/item, description, amount]} ]],
          headName2 : [ ...data in same format ]
        } 
        here key used is array's index.
  */
  
  const handleLogout = () => {
    setUser('');
    navigate('/login');
  }

  return (
    <>
      <Routes> 
      <Route path='/login' element={<Login setUser={setUser}/>}/>
      <Route path='/' element={<Home user={user} handleLogout={handleLogout} />}/>
      </Routes>
    </>
  );
}

export default App;


/* 

  let rc= {};
  const rcHeadList = Object.keys(json.recurring || {});

  //passbyValue or Reference check !!!
  
  function convertData (headList, tempList, json.rc(list)) {
    
    (headList || []).forEach(headName => {
      const [sntAmt, ...tempArr1] = list[headName];
      const tempArr2 = (tempArr1 || []).map((tempObj,index)=>{
        let tempArr3 = Object.values(tempObj || {});
        const value1 = tempArr3[3];
        tempArr3[3] = tempArr3[6];
        tempArr3[6] = tempArr3[5];
        tempArr3[5] = tempArr3[4];
        tempArr3[4] = value1;
        const Obj = {[index]:tempArr3};
        return Obj;
      });
      const tempArr4  = [sntAmt, tempArr2];
      tempList = {...tempList,[headName]:tempArr4};
    })
  }

*/