import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Typography, Paper, Checkbox, FormControlLabel, ListItem, TextField, Button } from '@material-ui/core';
import { Employee } from './../../components/Employee/Employee';
import style from './index.css';

const Employees = (props) => {
const [employess, setEmployess] = useState([]);
const [isVaccinated, setIsVaccinated] = useState(false);
const [vaccineName, setVaccineName] = useState('');
const [vaccineDateFrom, setVaccineDateFrom] = useState('');
const [vaccineDateTo, setVaccineDateTo] = useState('');

const vaccines = [
  {
    value: 'None',
    label: 'None',
  },  
  {
    value: 'Pfizer',
    label: 'Pfizer',
  },
  {
    value: 'Johnson',
    label: 'Johnson',
  },
  {
    value: 'Oxford',
    label: 'Oxford',
  },
  {
    value: 'Sputnik',
    label: 'Sputnik',
  },
  {
    value: 'Sinopharm',
    label: 'Sinopharm',
  },
];

useEffect(() => {
    loadEmployees();
}, []);

const loadEmployees = async () => {
    const result = await axios.get("http://localhost:5000/employees");
    setEmployess(result.data);
};

const handleSearch = async () => {
    const result = await axios.get("http://localhost:5000/employees");
    if (result.status === 200) {   
      let reply = {};
      if(isVaccinated === true)
        reply = result.data.filter(item=>item.isVaccinated === isVaccinated);
      else if(vaccineName.length > 0)
          reply = result.data.filter(item=>item.vaccineName === vaccineName);
      else if(vaccineDateFrom.length > 0)
          reply = result.data.filter(item=>item.vaccineDate > vaccineDateFrom && item.vaccineDate < vaccineDateTo);

      if(reply.length > 0) 
        setEmployess(reply);        
      else
        setEmployess([]); 
    } 
};

const handleChange = name => event => {
  if(name === 'vaccineName')  
    setVaccineName(event.target.value);
  else if(name === 'vaccineDateFrom')  
    setVaccineDateFrom(event.target.value);
  else if(name === 'vaccineDateTo')  
    setVaccineDateTo(event.target.value);
  else if(name === 'isVaccinated')  
    setIsVaccinated(!isVaccinated);
};
    return (
        <div className={style.container}>
        <Paper className={style.root} elevation={1}>
          <Typography component="h3">
            Filter By
          </Typography>  

          <ListItem
                role={undefined}
                dense
                button
                alignItems="flex-start"
            >
          <FormControlLabel
                control={
                <Checkbox
                    onChange={handleChange('isVaccinated')}
                    value={isVaccinated}
                    color="primary"
                />
                }
                label="Is Vaccinated"
            />

          <TextField
          id="standard-select-vaccine-native"
          select
          label=""
          className={style.textField}
          value={vaccineName}
          onChange={handleChange('vaccineName')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: style.menu,
            },
          }}
          helperText="Please select vaccine name"
          margin="normal"
        >
          {vaccines.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <TextField
          label="From"
          id="VaccineDate-from"
          onChange={handleChange('vaccineDateFrom')}          
          defaultValue="01/01/2021"
          value={vaccineDateFrom}
          className={style.dateTextField}
          helperText="VaccineDate From"
        />

        <TextField
          label="To"
          id="VaccineDate-to"
          onChange={handleChange('vaccineDateTo')}              
          defaultValue="10/10/2021"
          value={vaccineDateTo}
          className={style.dateTextField}
          helperText="VaccineDate To"
        />

        <Button color="primary" className={style.button} onClick={handleSearch}>
           Search
        </Button>
        </ListItem>                 
        </Paper>          
        {employess.length === 0 && (
          <div className={style.noItems}>
            <Typography color="textSecondary" gutterBottom>
              No Items to Display
            </Typography>
          </div>
        )}
        {employess.length > 0 && (
          <List className={style.list}>
            {employess.map((employee) => (
              <Employee key={employee.id} employee={employee} />
            ))}
          </List>
        )}
      </div>
    )    
}

export default Employees; 