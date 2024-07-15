import React, { useState } from 'react';
import './SidebarAccountant.css';
import AddInvoice from './AddInvoice';
import ShowInvoiceTable from '../tables/ShowInvoiceTable';

function SidebarAccountant({rList, nrList, tempHandleValues, session}) {

    const [viewModal,setviewModal] = useState([true,false]);   
    const classNameNav = 'sidebar-content';

    const handleViewModal = (i) => {
        console.log(i,viewModal,'Sidebar');
        
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

    const handleInvoice = (budgetType, details) =>{
        console.log(budgetType,details, 'acc');
        tempHandleValues(3,budgetType, details);
    }
   
  return (
    <div className='siderbar-container'>
    <ul className='sidebar-navigation'>
        <li className={`${classNameNav}${viewModal[0] === false ? '' : ' nav-highlight'}`} id='nav-option1' 
        onClick={()=>{ handleViewModal(0);}}> Add Invoice
        </li>   
    </ul>
    <div className='sidebar-table-heading'>Report</div>
    <div className='sidebar-selected-optn'>
    {    
        viewModal[0] && <><AddInvoice rList={rList} nrList={nrList} 
            temphandlelist={handleInvoice} session={session}/>
        <ShowInvoiceTable rList={rList} nrList={nrList} />
        </>
    }
    </div>
    </div>
  )
}

export default SidebarAccountant
