import React, { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './ExpenditureTable.css';
import TablePagination from '@mui/material/TablePagination';

function ExpenditureTable({rList,nrList}) {
  
    const [budgetType, setBudgetType] = useState('recurring');
    const [list,setList] = useState(rList);
    const [selectedOption,setselectOption] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

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

    const getPaginatedData = () => {
        if (list[selectedOption] && list[selectedOption][1]) {
            const start = page * rowsPerPage;
            const end = start + rowsPerPage;
            return list[selectedOption][1].slice(start, end);
        }
        return [];
    };

    const handleRadioChange = (e) => {
        setBudgetType(e.target.value);
        setList(e.target.value=='recurring'?rList:nrList);
        setselectOption('');
        //setselectOption(e.target.value=='recurring'?Object.keys(rList)[0]);
    }

    const handleHeadName = (e) => {
        setselectOption(e.target.value);
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
        <div className='table-budget-options2'>
            <label htmlFor="expenditure-table-select" className='text1 expenditure-table-label1'> 
                    Select BudgetHead : </label>

            <select id='expenditure-table-select' value={selectedOption} className=''
            onChange={handleHeadName}>
                <option value="none" hidden> Select an Option </option>
                {Object.keys(list).map((option, index) => (
                    
                <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
        <TableContainer className='table-container'>
        <Table aria-label="Expenditure table" >
            <TableHead >
            <TableRow className='Expenditure-tablerow'>
                <TableCell>Service</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Proposal Date</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            { (list[selectedOption]!= undefined && list[selectedOption][1] !== undefined ) && getPaginatedData().map((itemOption, index) => {
                const tempArray = Object.values(itemOption);
                return (<TableRow key={index}>
                <TableCell>{tempArray[0][0]}</TableCell>
                <TableCell>{tempArray[0][1]}</TableCell>
                <TableCell>{tempArray[0][2]}</TableCell>
                <TableCell>{tempArray[0][3]}</TableCell>
                </TableRow>)
            })}
            </TableBody>
            </Table>
            {(list[selectedOption]!= undefined && list[selectedOption][1] !== undefined) && <TablePagination
              rowsPerPageOptions={[4, 6]}
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
            
            
        </TableContainer>
    </div>
  )
}

export default ExpenditureTable