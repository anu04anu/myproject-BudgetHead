import React, { useState, useRef } from 'react'
import './Sidebar.css';
import Addhead from '../components/Addhead';
import ExpenditureHeaditem from './ExpenditureHeaditem';
import AddHeadTable from '../tables/AddHeadTable';
import ExpenditureTable from '../tables/ExpenditureTable';
//create usereference and classname variable to change class.
function Sidebar({rList, nrList, tempHandleValues, budgetReport, session}) {

    const [viewModal,setviewModal] = useState([true,false]);
   
    const classNameNav = 'sidebar-content';

    const handleheadlist = (budgetType, details) =>{
       tempHandleValues(1,budgetType, details);
    }

    const handleExpList = (budgetType, details) =>{
        //console.log(...details,'hello');
        tempHandleValues(2,budgetType, details);
    }
    
    const handleViewModal = (i) => {
        //console.log(i,viewModal,'Sidebar');
        
        const tempviewModal = viewModal.map((element,index)=>{
            if(i===index) {
                return true;
            }
            else {
                return false;
            }
        });
        setviewModal(tempviewModal);
    }

  return (
    <div className='siderbar-container'>
        <ul className='sidebar-navigation'>
            <li className={`${classNameNav}${viewModal[0] === false ? '' : ' nav-highlight'}`} id='nav-option1' 
            onClick={()=>{ handleViewModal(0);}}> Add BudgetHead
            </li>   
            <li className={classNameNav + (viewModal[1] === false ? '' : ' nav-highlight')} id='nav-option2'
            onClick={()=>{ handleViewModal(1);}}> Add Expense
            </li>
          
        </ul>
        <div className='sidebar-table-heading'>Report</div>
        <div className='sidebar-selected-optn'>
       {    
            viewModal[0] && <><Addhead rList={rList} nrList={nrList} 
            temphandleheadlist={handleheadlist} budgetReport={budgetReport} session={session}/>
            <AddHeadTable rList={rList} nrList={nrList} />
            </>
        }
        {
            viewModal[1] && <><ExpenditureHeaditem rList={rList} nrList={nrList}
            temphandleheadlist={handleExpList} session={session}/>
            <ExpenditureTable rList={rList} nrList={nrList} />
            </>
        }
        </div>
    </div>
  )
}

export default Sidebar