import React, { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './ShowInvoiceTable.css';
import TablePagination from '@mui/material/TablePagination';
import './ShowInvoiceTable.css';

function ShowInvoiceTable({rList,nrList}) {

    const [budgetType, setBudgetType] = useState('recurring');
    const [list,setList] = useState(rList || nrList);
    const [selectedOption,setselectOption] = useState('');
    const [invoice, setInvoice] = useState('no')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    useEffect(() => {
        setList(budgetType=='recurring'?rList:nrList)
      }, [rList,nrList]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRadioChange = (e) => {
        setBudgetType(e.target.value);
        console.log(e.target.value);
        setList(e.target.value=='recurring'?rList:nrList);
        setselectOption('');
    }

    const handleHeadName = (e) => {
        setselectOption(e.target.value);
    }

    const handleInvoice = (e) => {
        setInvoice(e.target.value);
    }

  return (
        <div className='table-budget'>
            
            <div className='table-budget-options'>
                <div className='text1 tablebudget-type'>Select Budget Type :</div>    
                <label className='text2 table1-label1'>
                    <input type="radio" name="budgetType" value="recurring"  
                  checked={budgetType === 'recurring'} onChange={handleRadioChange}/>
                Recurring
                </label>
    
                <label className='text2 table1-label2'>
                <input type="radio" name="budgetType" value="non-recurring"  
                  checked={budgetType === 'non-recurring'} onChange={handleRadioChange}/>
                Non-Recurring
                </label>
            </div>
            
            <div className='table-budget-options2 invoice-opt1'>
                <label htmlFor="invoice-table-select" className='text1 expenditure-table-label1'> 
                        Select BudgetHead : </label>
    
                <select id='inoice-table-select' value={selectedOption} className=''
                onChange={handleHeadName}>
                <option value="none" hidden> Select an Option </option>
                    {Object.keys(list).map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            
            <div className='table-budget-options3'>
                <div className='text1 tablebudget-type'>Received invoice :</div>    
                
                <label className='text2 table3-label3'>
                    <input type="radio" name="invoiceType" value="yes"  
                  checked={invoice === 'yes'} onChange={handleInvoice}/>
                    Yes
                </label>
    
                <label className='text2 table3-label4'>
                    <input type="radio" name="invoiceType" value="no"  
                    checked={invoice === 'no'} onChange={handleInvoice}/>
                    No
                </label>
            </div>
            
            <TableContainer className='table-container'>
                <Table aria-label="Invoice table" >
                    <TableHead >
                    <TableRow className='invoice-tablerow'>
                        <TableCell>Service</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Proposal Date</TableCell>
                        {
                            invoice==='yes'?<><TableCell>Invoice No.</TableCell>
                                    <TableCell>Received Date</TableCell></>:null
                        }
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    { (list[selectedOption]!= undefined && list[selectedOption][1] !== undefined) && 
                        (list[selectedOption][1]|| []).filter((itemOption)=>{
                            const tempArray = Object.values(itemOption);
                            
                            if(invoice==='yes' && tempArray[0].length>5) {
                                console.log(itemOption,'123');
                                return itemOption
                            }
                            else if(invoice==='no' && tempArray[0].length===4) {
                                console.log(itemOption,'456');
                                return itemOption
                            }
                        }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((itemOption, index) => {
                            console.log(itemOption);
                        const tempArray = Object.values(itemOption);
                        return (<TableRow key={index}>
                        <TableCell>{tempArray[0][0]}</TableCell>
                        <TableCell>{tempArray[0][1]}</TableCell>
                        <TableCell>{tempArray[0][2]}</TableCell>
                        <TableCell>{tempArray[0][3]}</TableCell>
                        {
                            ( invoice==='yes')?<><TableCell>{tempArray[0][4]}</TableCell>
                                    <TableCell>{tempArray[0][5]}</TableCell></>:null
                        }
                        </TableRow>)
                    })}
                    </TableBody>
                
                    {(list[selectedOption]!= undefined && list[selectedOption][1] !== undefined) && <TablePagination
                    rowsPerPageOptions={[3,4]}
                    component="div"
                    count={list[selectedOption][1].length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        overflow: 'unset', 
                    }}
                    />}
                    
                </Table>
            </TableContainer>

        </div>
  )
}

export default ShowInvoiceTable