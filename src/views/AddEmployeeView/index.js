import React, { useState } from "react";
import axios from 'axios';
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import AddEmployeeForm from "./AddEmployeeForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import md5 from 'md5';
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
        .spacing.unit * 5}px`,
    },
    container: {
      maxWidth: "200px"
    }
  });

const validationSchema = Yup.object({
    identificationNumber: Yup.string("Enter a Identification Number")
    .min(10, "Identification Number must contain atleast 10 characters")
    .required("Identification Number is required"),
    firstName: Yup.string("Enter a firstname").max(40, "FirstName must contain maximun 40 characters").required("FirstName is required").matches(/^[a-zA-Z ]+$/, "Must be only characters"),
    lastName: Yup.string("Enter a lastName").max(40, "LastName must contain maximun 40 characters").required("LastName is required").matches(/^[a-zA-Z ]+$/, "Must be only characters"),
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required")
  });

const AddEmployee = (props) => {
  const history = useHistory();
  const values = { identificationNumber: 0, firstName: "", lastName: "", email: "", birthDate: "", homeAddress: "", mobilePhoneNumber: "", isVaccinated: false, vaccineName: "", vaccineDate: "", vaccineTimes: 0, isAdmin: false };
  const [successfullySaved, setSuccessfullySaved] = useState(false);
  const [userAccount, setUserAccount] = useState("");
  const [passwordAccount, setPasswordAccount] = useState("");  
  const [identificationNumberDb, setIdentificationNumberDb] = useState('');


  const submit = data => {
    const identificationNumber = Object.entries(data)[0]
    setIdentificationNumberDb(identificationNumber[1]);

    try {
        axios.post('http://localhost:5000/employees', data)
        .then(reply => {
          const email = Object.entries(data)[0];          
          setUserAccount(md5(email[1]));
          const randomString = Math.random().toString(36).slice(-8);
          setPasswordAccount(randomString);
          setSuccessfullySaved(true);
        })
        .catch(error => {
          setSuccessfullySaved(false);
        })
    } catch (error) {
    }    
  };

  const handleClose = (event, reason) => {
    const userPayload = { user: userAccount, password: passwordAccount, identificationNumber: identificationNumberDb }
    axios.post('http://localhost:5000/users', userPayload)
    .then(reply => {
      history.push("/");
    })
    .catch(error => {
    })

    setSuccessfullySaved(false);
};

const UserAccountDialog = () => {
  return (
    <div>
        <Dialog
          open={successfullySaved}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"New user account generated"}</DialogTitle>
          <DialogContent>            
            <DialogContentText id="alert-dialog-description">
               A new account has been created !!
              <br />
               User: {userAccount}
              <br />
               Password: {passwordAccount}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );  
}

    return (
        <React.Fragment>
        <div className={styles.container}>
          <Paper elevation={1} className={styles.paper}>
            <h1>Add Employee</h1>
            <br />
            <Formik
              render={props => <AddEmployeeForm {...props} />}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={submit}
            />          
          </Paper>
          {
              successfullySaved && <UserAccountDialog />
          }
        </div>
        </React.Fragment>
    );      
}

export default withStyles(styles)(AddEmployee); 