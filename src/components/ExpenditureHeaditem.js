import React, { useState,useEffect } from 'react';
import './ExpenditureHeaditem.css';

function ExpenditureHeaditem({rList, nrList, temphandleheadlist, session}) {

  const [budgetType,setBudgetType] = useState('');
  const [headList,setheadList] = useState('');
  const [selectedOption,setselectOption] = useState('');
  const [itemName,setitemName] = useState('');
  const [descriptionContent,setdescriptionContent] = useState('');
  const [amount,setamount] = useState();
  const [error, setError] = useState([false,'']);
  const [isPending,setIsPending] = useState(false);

  useEffect(() => {
    setheadList(budgetType=='recurring'?rList:budgetType=='non-recurring'?nrList:'');
  }, [rList,nrList]);

  const handleRadioChange = (e) => {
    setBudgetType(e.target.value);
    setheadList(e.target.value=='recurring'?rList:nrList);
    
    setselectOption(Object.keys(e.target.value=='recurring'?rList:nrList)[0]);
    setError([false,'']);
  }

  const handleHeadName = (e) => {
    //called when (onChange) when headName changes
    if(budgetType=='') {
      setError([true,'Select budget type !!!']);
      return;
    }
    else if(error[0]==true) {setError([false,'']);}
    setitemName(''); setdescriptionContent(''); setamount(0.0); 
    setselectOption(e.target.value);
  }

  const handleAmount = (e) => {
    if(budgetType=='') {
      setError([true,'Select Budget Type !!!']);
      return;
    }
    console.log(selectedOption,'123');
    if(selectedOption=='' || selectedOption==undefined) {
      setError([true,'Complete above fields !!!']);
      return;
    }
    //error[0]==true?setError([false,'']):console.log('fine');
    const temp = e.target.value;
    let tempAmt = 0.0;
    //console.log(selectedOption, headList[selectedOption],' fgegeg');
    const tempBudget = parseFloat(headList[selectedOption][0]);
   
    (headList[selectedOption][1] || []).forEach(element => {
      const tempArr = Object.values(element);
      tempAmt = tempAmt + parseFloat(tempArr[0][2]);
      
    });
   
    if((temp)>(tempBudget-tempAmt)) {
      setError([true,'Amount crossed for this budgetHead.']);
      return;
    }
    else if(error[0]===true) {
      setError([false,'']);
    }
    setamount(temp);
  }

  const handleItem = async(e) =>{
    e.preventDefault();
    
    if(error[0]===true) {
      setError([false,'']);      
    }
    if(budgetType=='' || selectedOption==undefined || itemName.length===0 || descriptionContent.length===0 || amount==0) 
       {
      alert('Enter details in every field.');
      return;
    }
   /* const form = e.target;
    const formData = new FormData(form);
    
    try {
      setIsPending(true);
      const response = await fetch('/some-api', { method: 'POST', body: formData });

      if(!response.ok) {
        throw new Error('Could not update.');
      }

      const tempData = await response.json();
      setIsPending(false);

      setitemName(''); setdescriptionContent(''); setamount(0.0);
      //add tempData.
      temphandleheadlist(budgetType,[selectedOption,itemName,descriptionContent,amount,tempData]);
    }catch(error) {
      console.log(error);
      setIsPending(false);
    }*/

      setitemName('');  setamount(0); setdescriptionContent('');
      temphandleheadlist(budgetType,[selectedOption,itemName,descriptionContent,amount]);
  }
  //check for amount not crossing budget for that head.

  return (
    <div className='modal-container'>
      <div className='modal-box'>
        
        <div className='modal-heading'> 
          Add Expense <div className='modal-session'>Session {session}</div>
        </div>
        
        <form className='expenditure-form' onSubmit={handleItem}>
        <fieldset disabled={isPending} className='expenditure-fieldset'>
          <div className='text1 budget-type'>Select Budget Type</div>

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
  
          <label htmlFor="expenditure-select" className='text1 expenditure-label1'> 
                    Select BudgetHead : </label>

          <select id='expenditure-select' name='headName' value={selectedOption} className='text3'
            onChange={handleHeadName}>
            
            {Object.keys(headList).map((option, index) => (
            <option key={index} value={option}>{option}</option>
            ))}
          </select>

          <label htmlFor="expenditureNameInput" className='text1 expenditure-label2'> Enter Service : </label>
            <input type='text' id='expenditureNameInput' className='text3' name='service'
             onChange={(e)=> { setitemName(e.target.value); setError([false,'']);}} value={itemName}/>

          <label htmlFor="amountInput" className='text1 expenditure-label3'> Enter Amount : </label>
            <input type='number' id='amountInput' className='text3' name='serviceAmount' value={amount}
             onChange={handleAmount}/>
          
          <label htmlFor="descriptionInput" className='text1 expenditure-label4'> Enter Description : </label>
          <textarea id='descriptionInput' value={descriptionContent}  className='text3' name='serviceDesc'
              onChange={e => {setdescriptionContent(e.target.value); setError([false,'']);}}/>
         
          {!isPending && <button  className='modal-button exp'>Add</button>}
          {isPending && <button className='modal-button'>Adding...</button>}
          {error[0] && <div className='addExpence-error'>{error[1]}</div>}
        </fieldset>
        </form>

      </div>
    </div>
  )
}

export default ExpenditureHeaditem