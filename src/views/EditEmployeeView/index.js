import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import EditEmployeeForm from "./EditEmployeeForm";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";

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

const EditEmployee = (props) => {
  const history = useHistory();
  const values = { identificationNumber: 0, firstName: "", lastName: "", email: "" };
  const { id } = useParams();
  const [successfullySaved, setSuccessfullySaved] = useState(false);
  const [identificationNumberDb, setIdentificationNumberDb] = useState(0);

  useEffect(() => {
    getData();   
  }, []);

  const getData = async () => {
    const employee = await axios.get(`http://localhost:5000/employees/${id}`)
    values.identificationNumber = employee.data.identificationNumber;
    values.firstName = employee.data.firstName;
    values.lastName = employee.data.lastName;
    values.email = employee.data.email;

    setIdentificationNumberDb(employee.data.identificationNumber);
  }

  const submit = data => {
    try {
        axios.put(`http://localhost:5000/employees/${id}`, data)
        .then(reply => {
          setSuccessfullySaved(true);
        })
        .catch(error => {
          setSuccessfullySaved(false);
        })
    } catch (error) {
    }    
  };

  const handleClose = (event, reason) => {
    history.push("/");
  };

  const EmployeeAccountDialog = () => {
    return (
      <div>
          <Dialog
            open={successfullySaved}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
            <DialogContent>            
              <DialogContentText id="alert-dialog-description">
                  Record has been updated successfully !!
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
            <h1>Edit Employee</h1>
            <br />
            <Formik
              render={props => <EditEmployeeForm {...props} />}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={submit}
            />          
          </Paper>
          {
              successfullySaved && <EmployeeAccountDialog />
          }
        </div>
        </React.Fragment>
    );      
}

export default withStyles(styles)(EditEmployee); 