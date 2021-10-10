import JwtDecode from 'jwt-decode';
import { REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED, LOGOUT_SUCCESS } from '../actions/types';

export const checkTokenExpired = () => async (dispatch, getState) => {
    const access = getState().auth.accessToken;
    const refresh = getState().auth.refreshToken;

    if (!refresh) {
        dispatch({ type: LOGOUT_SUCCESS })
        return ''
    }

   let sw = true;

   if (access === "undefined") 
       sw = false;

    let flag = false;
    if (sw === true) { 
        try {
            const decoded = JwtDecode(access);
            const expired = new Date(decoded.expires);

            const untilExpired = (expired - Date.now()) / 1000 / 60;
            if(untilExpired < 1){
                flag= true;
            }
        }
        catch(e) {
        }
    }

    if (flag || !access) {
        try {
            const payload = "REFRESH_TOKEN_SUCCESS!";
            let data = { data: payload, errors: {} };

            dispatch({
                type: REFRESH_TOKEN_SUCCESS,
                payload: data
            })
        }
        catch (e) {
            dispatch({
                type: REFRESH_TOKEN_FAILED
            })
        }
    }
    return ''
}
