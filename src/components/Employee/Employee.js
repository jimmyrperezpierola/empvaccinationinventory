import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import {
    ListItem,
    ListItemText,
    Tooltip,
    Typography,
    ListItemSecondaryAction,
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from '@material-ui/core';
  import { Edit, Delete } from '@material-ui/icons';
  import style from './index.css';

export const Employee = ({ employee }) => {
    const history = useHistory();
    const [successfullyDeleted, setSuccessfullyDeleted] = useState(false);    
    
    const handleEdit = () => {
        history.push(`/edit-employee/${employee.id}`);
    };

    const deleteEmployee = async id => {
        await axios.delete(`http://localhost:5000/employees/${id}`);
        setSuccessfullyDeleted(true);
    };

    const handleClose = () => {
      history.push("/");
    };

    const DeleteDialog = () => {
        return (
          <React.Fragment>
              <Dialog
                open={successfullyDeleted}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                <DialogContent>            
                  <DialogContentText id="alert-dialog-description">
                    Record deleted successfully !!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary" autoFocus>
                    Okay
                  </Button>
                </DialogActions>
              </Dialog>
          </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {
                successfullyDeleted && <DeleteDialog />
            }
            <ListItem
                role={undefined}
                dense
                button
                alignItems="flex-start"
            >
                <ListItemText
                className={style.TaskTextContent}
                primary={employee.identificationNumber}
                secondary={
                    <React.Fragment>
                      <Typography component="span" className={style.inline} color="textPrimary">
                        {employee.firstName} {employee.lastName}
                      </Typography>
                      {' '} {employee.email}
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                <Tooltip title="Edit Employee">
                    <IconButton aria-label="edit" onClick={handleEdit}>
                    <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete Employee">
                    <IconButton aria-label="delete" onClick={() => deleteEmployee(employee.id)}>
                    <Delete />
                    </IconButton>
                </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        </React.Fragment>
    );
}