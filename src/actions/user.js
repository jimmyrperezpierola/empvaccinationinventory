import {
    IS_ADMIN,
    EMPLOYEE_ID
} from './types';

export const isAdmin = (isAdmin) => async (dispatch, getState) => {
    dispatch({ type: IS_ADMIN, payload: { isAdmin: isAdmin }});
}

export const employeeId = (id) => async (dispatch, getState) => {
    dispatch({ type: EMPLOYEE_ID, payload: { id: id }});
}
