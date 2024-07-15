import React, { useState,useEffect } from 'react'
import InvoiceTable from './InvoiceTable';
import './AddInvoice.css';

function AddInvoice({rList, nrList,temphandlelist, session}) {

    console.log('123 123',rList);
    const [budgetType, setBudgetType] = useState('recurring');
    const [headList,setheadList] = useState(rList); //rlist or nrList
    const [selectedOption,setselectOption] = useState(Object.keys(rList)[0] || Object.keys(nrList)[0]);
    
    const [showTable, setshowTable] = useState(true);
    const [invoiceNo, setinvoiceNo] = useState('');
    const [payDate, setpayDate] = useState('');
    const [selectedIndex,setSelectedIndex] = useState(0); //item for which invoice will be added
    const [error, setError] = useState([false,'']);
    const [isPending, setIsPending] = useState(false);

    const handleRadioChange = (e) => {
      
      if(Object.keys(e.target.value=='recurring'?rList:nrList).length==0) {
        setError([true,'No budgetHead added.']);
        setBudgetType(e.target.value);
        setheadList(e.target.value=='recurring'?rList:nrList);
        setselectOption('');
        return;
      }
      
      setError(false,'');
      setBudgetType(e.target.value);
      setheadList(e.target.value=='recurring'?rList:nrList);
      setselectOption(Object.keys(e.target.value=='recurring'?rList:nrList)[0]);//headName
      
    }

    const handleSelectedOption = (e) => { 

        if( headList[e.target.value][1]==undefined) {
          setError([true,'No cummodity added !!!']);
          return;
        }
        else {
          setError([false,'']);
          setselectOption(e.target.value);
          setshowTable(true);
        }
    }


    const handleInvoiceForm = async(e) =>{
      e.preventDefault();
      //console.log(' invoicedetails 1234');
      if(error[0]==true){
        setError([false,''])
      };
      if(invoiceNo==='' || payDate==='') {
        alert('Complete the details !!!');
      }
      else if (selectedIndex==='') {
        alert('No row selected');
        setinvoiceNo(''); setpayDate('');
      }
      else {
        //API Form
        /*const formData = new FormData();
        formData.append("Id",headList[selectedOption][1][selectedIndex][3]);
        formData.append('invoiceNo',invoiceNo);
        formData.append('payementDate',payDate);*/
       
        try {
          setIsPending(true);
          /*const response = await fetch('/some-api', { method: 'POST', body: formData });

          if(!response.ok) {
            throw new Error('Could not update.');
          }*/

          const details = [selectedOption,selectedIndex,invoiceNo,payDate];
          //console.log(details,' invoicedetails');
          setinvoiceNo(''); setpayDate('');  
          temphandlelist(budgetType,details);
        } catch(error) {
          console.log(error);
          setIsPending(false);
          setError([true,'Could not update data']);
        };
      }
    };
   // console.log(selectedOption);

  useEffect(() => {
    setheadList(budgetType=='recurring'?rList:nrList);
    setSelectedIndex('');
    setIsPending(false);
  }, [rList,nrList]);


  return (
    <div className='modal-container'>
        <div className='modal-box'>
      
        <div className='modal-heading'> 
          Add Invoice <div className='modal-session'>Session {session}</div>
        </div>
        <form className='invoice-form' onSubmit={handleInvoiceForm}>
        <fieldset disabled={isPending} className='addInvoice-fieldset'>
          <div className='text1 budget-type'>Select Budget Type :</div>

          <label className='text2 addinvoice-label1'>
            <input type="radio" name="budgetType" value="recurring"  id="invoive-radio-opt1"
              checked={budgetType === 'recurring'} onChange={handleRadioChange}/>
            Recurring
          </label>

          <label className='text2 addinvoice-label2'>
            <input type="radio" name="budgetType" value="non-recurring"  id="invoice-radio-opt2"
              checked={budgetType === 'non-recurring'} onChange={handleRadioChange}/>
            Non-Recurring
          </label>
          
          <label htmlFor="invoice-select" className='text1 invoice-select-label'> 
                    Select head : </label>
          <select id='invoice-select' value={selectedOption} name='headName'
            onChange={(e)=>handleSelectedOption(e)}>
            
            {Object.keys(headList || {}).map((option, index) => (
            <option key={index} value={option}>{option}</option>
            ))}
          </select>

          {!error[0] && showTable && <InvoiceTable headListOption={ Object.keys(headList).length!==0?headList[selectedOption][1]:[]} 
                          selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/> }

          <label htmlFor="invoice-select-invoicenumb" className='text1 invoice-select-label-3'> 
                    Enter invoice no. : </label>
          <input type='text' id='invoice-select-invoicenumb' value={invoiceNo} name='invoiceNo'
            onChange={(e)=>setinvoiceNo(e.target.value)}/>
            
          <label htmlFor="invoice-select-paydate" className='text1 invoice-select-label-4'> 
                    Enter payement date : </label>
          <input type='date' id='invoice-select-paydate' value={payDate} name='payDate'
            onChange={(e)=>setpayDate(e.target.value)}/>

          {error[0] && <div className='addInvoice-error'>{error[1]}</div>}
          {!isPending && <button className='modal-button invoice'>Add</button>}
            {isPending && <button className='modal-button invoice'>Adding...</button>}
          </fieldset>
          </form>
      </div>
    </div>
  )
}

export default AddInvoice