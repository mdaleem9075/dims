import { Button, Grid, MenuItem, Select } from '@mui/material'
import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Reports = () => {
  return (
    <>
       <Grid container sx={{ margin:"10px", alignContent:"center",padding:"10px" }}  >
        
       <Grid item xs={2}></Grid>
          <Grid item xs={8} >
             <Select fullWidth  >
                <MenuItem>One</MenuItem>
                <MenuItem>Two</MenuItem>
                <MenuItem>Three</MenuItem>
             </Select>
          </Grid>
          <Grid item xs={2}></Grid>
          <br/>
          <br/>
          <br/>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker fullWidth  />
         </LocalizationProvider>
          </Grid>
           
          <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker fullWidth />
         </LocalizationProvider> 
          </Grid>
          <Grid item xs={2} ></Grid>
          <br/>
          <br/>
          <br/>
          <Grid item xs={2} ></Grid>
          <Grid item xs={8} >
            <Button fullWidth  variant='contained' >Add</Button>
          </Grid>
       </Grid>
    </>
  )
}

export default Reports