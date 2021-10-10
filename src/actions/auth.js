import axios from 'axios';
import {
    USER_LOADING,
    CLEAR_NOTIFICATION_STARTER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    START_LOADING,
    STOP_LOADING,
    IS_ADMIN,
    EMPLOYEE_ID
} from './types';
const url = "http://localhost:5000";

export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
}

const loadEmployeeByIdentificationNumber = async (idNumber, dispatch) => {
    const res = await axios.get(`${url}/employees/`);
    if (res.status === 200) {
        const reply = res.data.filter(item=>item.identificationNumber.toLowerCase().includes(idNumber));
        if(reply.length > 0) {
            const userData = Object.values(reply)[0];
            const id = userData.id;
            dispatch({
                type: EMPLOYEE_ID,
                payload: id
            });
        }
    }
};

export const login = (email, password) => async (dispatch, getState) => {    
    dispatch({ type: START_LOADING })
    if(email === 'admin' && password === 'adminU031') {
        const payload = "LOGIN_SUCCESS!";
        let data = { data: payload, errors: {}};
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        });

        dispatch({
            type: IS_ADMIN,
            payload: true
        });

        dispatch({ type: STOP_LOADING });
        return;
    }

    const res = await axios.get(`${url}/users/`);
    if (res.status === 200) {
        const reply = res.data.filter(item=>item.user.toLowerCase().includes(email));
        if(reply.length > 0) {
            const userData = Object.values(reply)[0];
            const user = userData.user;
            const pass = userData.password;
            const idNumber = userData.identificationNumber;
            
            if(user === email && pass === password) {
                const payload = "LOGIN_SUCCESS!";
                let data = { data: payload, errors: {}};
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: data
                });

                dispatch({
                    type: IS_ADMIN,
                    payload: false
                }); 

                loadEmployeeByIdentificationNumber(idNumber, dispatch);
            }
        }
    }
    else {
        dispatch({
            type: LOGIN_FAIL,
            payload: res.data.data.message
        })
    }

    dispatch({ type: STOP_LOADING });
}

export const logout = () => async (dispatch, getState) => {
    try {
        const payload = "LOGOUT_SUCCESS!";
        let data = { data: payload, errors: {} };

        dispatch({
            type: LOGOUT_SUCCESS,
            payload: data
        });
    } catch (e) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: e
        })
    }
};

export const clearNotificationStarter = () => async (dispatch, getState) => {
    dispatch({ type: CLEAR_NOTIFICATION_STARTER })
}