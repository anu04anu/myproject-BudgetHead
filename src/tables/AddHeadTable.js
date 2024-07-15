import React, { useState,useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import './AddHeadTable.css';

function AddHeadTable({rList,nrList}) {
    
    const [budgetType, setBudgetType] = useState('recurring');
    const [list,setList] = useState(rList);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    useEffect(() => {
      setList(budgetType=='recurring'?rList:nrList)
    }, [rList,nrList]);

    const handleRadioChange = (e) => {
        setBudgetType(e.target.value);
        console.log(e.target.value);
        setList(e.target.value=='recurring'?rList:nrList);
    };

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
        <TableContainer >
        <Table aria-label="AddHead table" >
            <TableHead >
            <TableRow className='Addhead-tablerow'>
                <TableCell>HeadName</TableCell>
                <TableCell>Budget</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {Object.keys(list||{}).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((headName, index) => (
                <TableRow key={index}>
                <TableCell>{headName}</TableCell>
                <TableCell>{ list?.[headName][0] }</TableCell>
                </TableRow>
            ))}
            </TableBody>
            <TablePagination
              rowsPerPageOptions={[5, 8]}
              component="div"
              count={Object.keys(list).length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                overflow: 'unset', // Remove overflow property
              }}
            />
        </Table>
        </TableContainer>
    </div>
  )
}

export default AddHeadTable