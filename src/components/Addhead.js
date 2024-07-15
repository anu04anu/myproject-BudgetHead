import React, { useState } from 'react'
import './Addhead.css';

function Addhead({rList, nrList,temphandleheadlist, budgetReport,session}) {

  const [budgetType, setBudgetType] = useState('');
  const [headName, setHeadName] = useState('');
  const [headBudget, setHeadBudget] = useState();
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState([false,'']);
  const [isPending, setIsPending] = useState(false);

  const handleRadioChange = (e) => {
    setBudgetType(e.target.value);
  }

  const handleHeadName = (e) => {
    //called when (onChange) when headName changes
    if(budgetType==='') {
      setError([true,'** Select budget type !!!']);
      return;
    }
    else {setError([false,'']);}
    setHeadName(e.target.value);
    const headList = budgetType=='recurring'?rList:nrList;
    const ifExist = Object.keys(headList || {}).some((element)=>element===e.target.value);
    
    if(ifExist)
      {
        setDisable(true);
        setError([true,'** The BudgetHead already exists.']);
      }
    else
      {
        setDisable(false);
        setError([false,'']);
      }
  }

  const handleAmmount = (e) => {
    //called when (onChange) when headBudget changes
    if(headName.length===0) {
      setError([true,'** Enter head name']);
      return;
    }
    else {setError([false,'']);}
    setHeadBudget(e.target.value);
    const tempAmount = budgetReport.amountTotal - budgetReport.amountAssigned;
    if(tempAmount<e.target.value) {
      setError([true,'** Amount exceeded Total Budget !!!']);
    }
    else {
      setError([false,'']);
    }
  }

  const handleBudgetSubmission = async(e) => {
    e.preventDefault();
    if(budgetType.length==0 || headName.length==0 || headBudget==0) {
      alert('Enter all details.');
      return;
    }

    /*// Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // You can pass formData as a fetch body directly:
    try {
      setIsPending(true);
      const response = await fetch('/some-api', { method: 'POST', body: formData });

      if(!response.ok) {
        throw new Error('Could not update.');
      }

      //const tempData = await response.json();
      setIsPending(false);
      const details = [headName,headBudget];
      setBudgetType(''); setHeadBudget(''); setHeadName('');
      return temphandleheadlist(budgetType,details);

    } catch(error) {
      console.log(error);
      setIsPending(false);
    }*/
      const details = [headName,headBudget];
      setBudgetType(''); setHeadBudget(''); setHeadName('');
      return temphandleheadlist(budgetType,details);
  }

  return (
    <div className='modal-container'>     

      <div className='modal-box'>
        <div className='modal-heading'> 
          Add BudgetHead <div className='modal-session'>Session {session}</div>
        </div>  
        <form onSubmit={handleBudgetSubmission} className='addBudgetHead-form'>
          <fieldset disabled={isPending} className='addBudgetHead-fieldset'>
            <div className='text1 budget-type'>Select Budget Type :</div>

            <label className='text2 addBudget-label1'>
              <input type="radio" name="budgetType" value="recurring"  id="radio-opt1"
                checked={budgetType === 'recurring'} onChange={handleRadioChange}/>
              Recurring
            </label>

            <label className='text2 addBudget-label2'>
              <input type="radio" name="budgetType" value="non-recurring"  id="radio-opt2"
                checked={budgetType === 'non-recurring'} onChange={handleRadioChange}/>
              Non-Recurring
            </label>

            <label htmlFor="headNameInput" className='text1 addBudget-label3'> Enter Head Name : </label>
            <input type='text' id='headNameInput' name='headName'
              onChange={handleHeadName} value={headName}/>

            <label htmlFor="amtInput" className='text1 addBudget-label4'> Enter Amount : </label>
              <input type="number" id='amtInput' disabled={disable} name='bugdetheadAmount'
              onChange={handleAmmount} value={headBudget}/>

            {!isPending && <button className='modal-button'>Add</button>}
            {isPending && <button className='modal-button'>Adding...</button>}
            {error[0] && <div className='addBudget-error'>{error[1]}</div>}
          </fieldset>
        </form>
        </div>
    </div>
  )
  
}

export default Addhead

