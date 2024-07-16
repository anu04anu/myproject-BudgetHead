import React from 'react';
import { useState,useRef, useEffect} from 'react';
import TopBody from '../components/TopBody';
import './HomeMain.css';
import Sidebar from '../components/Sidebar';
import SidebarAccountant from '../components/SidebarAccountant';
import updateBudgetList from '../components/updateBudgetList';
import StartData from '../data/tempBudget.json';

function Home({user,handleLogout}) {
 
  const [recurringHeadList, setRecurringHeadList] = useState(() => {
    const storedData = localStorage.getItem('recurringHeadList');
    return storedData ? JSON.parse(storedData) : StartData.rc;
  });
  
  const [nonrecurringHeadList,setNonRecurringHeadList] = useState(() => {
    const storedData = localStorage.getItem('nonrecurringHeadList');
    return storedData ? JSON.parse(storedData) : StartData.nrc;
  });

  const [session, setSession] = useState(()=>{
    const storedData = localStorage.getItem('session');
    return storedData ? JSON.parse(storedData) : ('(2024-2025)');
  });

  //To get data and session initially
  /*useEffect(() => {
    const url1 = "http://"; //Complete data
    const url2 = "http://"; //session format - '(2024 - 2025)'
    
    const fetchData1 = async (url) => {
      try {
        const response = await fetch(url);
        
        if(!response.ok) {
          throw new Error('Could not recieve data. Reload the page.');
        }

        const json = await response.json();
        console.log(json);
        setRecurringHeadList(json.rc);
        setNonRecurringHeadList(json.nrc);
      } catch (error) {
        console.log("error", error);
      }
    };    
    fetchData1(url1);

    const fetchData2 = async (url) => {
      try {
        const response = await fetch(url);

        if(!response.ok) {
          throw new Error('Could not recieve data. Reload the page.');
        }

        const json = await response.json();
        console.log(json);
        setSession(json);
      } catch (error) {
        console.log("error", error);
      }
    };    
    fetchData2(url2);
    
  }, []);*/

  //Not Using, do not uncomment.
  useEffect(() => {
    localStorage.setItem('recurringHeadList', JSON.stringify(recurringHeadList));
    //console.log('Saving to localStorage:', recurringHeadList);
  }, [recurringHeadList]);

  useEffect(() => {
      localStorage.setItem('nonrecurringHeadList', JSON.stringify(nonrecurringHeadList));
  }, [nonrecurringHeadList]);
  
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  useEffect(()=>{
    if(session==''){
      setRecurringHeadList(StartData.rc);
      setNonRecurringHeadList(StartData.nrc);
      setSession('(2025 - 2026)');
      localStorage.setItem('session', JSON.stringify('(2025 - 2026)'));
    }
  },[session]);

    const [budgetReport, setBudgetReport] = useState({amountTotal:50000000, amountAssigned:0})
    
    const reportRef = useRef(null);
    const updateRef = useRef(null);

    const navigateToPage = (index) => {
      if(index==1) {
        reportRef.current?.scrollIntoView({
          behavior: 'smooth'
        })
      }
      else if(index==2) {
        updateRef.current?.scrollIntoView({
          behavior: 'smooth'
        })
      }
    }

    const handleValues = (functionIndex, budgetType, details) => {
      //console.log(recurringHeadList);
      const [headList,setHeadList] = budgetType==='recurring'?[recurringHeadList,setRecurringHeadList]:
        [nonrecurringHeadList,setNonRecurringHeadList];
      //console.log(headList, budgetType==='recurring'?recurringHeadList:'no');
    
      if(functionIndex===1) {
        //details-headName, amount
        setBudgetReport((prevState)=>({
          ...prevState,
          amountTotal:prevState.amountTotal-details[1],
          amountAssigned:details[1] 
        }));
        updateBudgetList.handleHeadList(setHeadList,...details);
      }

      else if(functionIndex===2) {
        //details-headName, itemName, descriptionContent, amount, Eid
        updateBudgetList.handleExpense(headList,setHeadList,details);
      }
      else if(functionIndex===3) {
        //details-headName, tempindex, tempInvoice, temppaydate
        console.log(headList, 'home');
        updateBudgetList.handleInvoice(headList,setHeadList,details) ;
      }
    }

  return (
    <>
    <section className='top-body'>
        <TopBody handleLogout={handleLogout} 
          navigateToPage={navigateToPage} user={user} setSession={setSession}/>
    </section>
    {/*<section ref={reportRef} className='display-table'><ShowReport recurringHeadList={recurringHeadList}/></section>
    */}
    <section ref={updateRef} className='update-table'>
          <div className='update-report'> 
        {(user==='pip')? 
          <><div className='update-report-heading'><span>Update Details</span></div>
        <Sidebar rList={recurringHeadList} nrList={nonrecurringHeadList} 
          tempHandleValues={handleValues} budgetReport={budgetReport} session={session}/> </>:
        user==='accountant'?
        <><div className='update-report-heading'><span>Update Details</span></div><SidebarAccountant rList={recurringHeadList} 
          nrList={nonrecurringHeadList} tempHandleValues={handleValues} budgetReport={budgetReport}
          session={session}/></>:null
        }
          </div>
    </section>
    </>
  )
}

export default Home