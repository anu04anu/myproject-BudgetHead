import React, { useState } from 'react';
import './InvoiceTable.css';

function InvoiceTable({headListOption,selectedIndex,handleRowSelection}) {

    const handleRowSelect = (tempselectedIndex) => {
    
      console.log(selectedIndex,'invoice selected key',tempselectedIndex);
      handleRowSelection(tempselectedIndex);
    };
   
    const filteredData = (headListOption || []).filter((item) => {
        const tempkey = Object.keys(item)[0];
        //console.log('invoice-table',item);
        return item[tempkey].length<5; // Assuming the service/item is the first element in the array
    });
    console.log(selectedIndex);
  return (
    <div className='invoice-tablecontainer'>
    <table className='invoice-table'>
      <thead className='invoice-table-head'>
        <tr className='invoice-table-headrow'>
          <th className='invoice-table-heading'>Service/Item</th>
          <th className='invoice-table-heading'>Description</th>
          <th className='invoice-table-heading'>Amount</th>
          <th className='invoice-table-heading'>Date/Time</th>
          <th className='invoice-table-heading'>Select a Row</th>
        </tr>
      </thead>
      <tbody className='invoice-table-body'>
        {filteredData.map((item, index) => (
          
          <tr key={index} className='invoice-table-bodyrow'>
            <td className='invoice-table-data'>{ Object.values(item)[0][0]}</td>
            <td className='invoice-table-data'>{Object.values(item)[0][1]}</td>
            <td className='invoice-table-data'>{Object.values(item)[0][2]}</td>
            {/* since Eid is not being received presently.*/}
            <td className='invoice-table-data'>{(Object.values(item)[0][3]).toLocaleString()}</td>
            <td className='invoice-table-data'>
              <input type="radio" name="selectedRow" checked ={selectedIndex==Object.keys(item)[0]}
                value={Object.keys(item)[0]} onChange={() => handleRowSelect(Object.keys(item)[0])} 
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default InvoiceTable