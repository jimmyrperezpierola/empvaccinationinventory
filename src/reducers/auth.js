import { USER_LOADING, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED, CLEAR_NOTIFICATION_STARTER, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, LOGOUT_SUCCESS, LOGOUT_FAIL } from '../actions/types';
import { setCookie, getCookie } from '../services/cookie';

const cookie = getCookie();
const initialState = {
    refreshToken: cookie ? cookie.refresh_token : '',
    accessToken: cookie ? cookie.access_token : '',
    isAuthenticated: cookie.refresh_token || cookie.access_token ? true : null,
    isLoading: false,
    user_id: localStorage.getItem('user_id'),
    notification: '',
    notificationType: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            if (state.accessToken) {
                return {
                    ...state,
                    isLoading: true,
                    isAuthenticated: true,
                };
            } else if(state.refreshToken) {
                return {
                    ...state,
                    isAuthenticated: true,
                    isLoading: true,
                };
            }
            else{
                return{
                    ...state,
                    isAuthenticated: false
                }
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
            };
        case LOGIN_SUCCESS:
            setCookie([
                {
                    "name": "access_token",
                    "value": action.payload.data.accessToken,
                    "expiry": 1
                }, {
                    "name": "refresh_token",
                    "value": action.payload.data.refreshToken,
                    "expiry": 30
                }
            ]);
            localStorage.setItem('user_id', action.payload.data.id);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                accessToken: action.payload.data.accessToken,
                refreshToken: action.payload.data.refreshToken,
                notification: 'Login Success.',
                notificationType: true
            };
        case LOGIN_FAIL:
            localStorage.setItem('user_id', '');

            setCookie([
                {
                    "name": "access_token",
                    "value": "",
                    "expiry": 1
                }, {
                    "name": "refresh_token",
                    "value": "",
                    "expiry": 1
                }
            ]);
            return {
                ...state,
                isAuthenticated: false,
                notification: action.payload,
                notificationType: false
            }
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
        case REFRESH_TOKEN_FAILED:
            localStorage.setItem('user_id', '');

            setCookie([
                {
                    "name": "access_token",
                    "value": "",
                    "expiry": 1
                }, {
                    "name": "refresh_token",
                    "value": "",
                    "expiry": 1
                }
            ]);
            return {
                ...state,
                token: null,
                user_id: null,
                isAuthenticated: false,
                isLoading: false,
                notification: '',
                notificationType: false
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                notification: action.payload,
                notificationType: false
            }
        case CLEAR_NOTIFICATION_STARTER:
            return {
                ...state,
                notification: '',
                notificationType: ''
            }
        case REFRESH_TOKEN_SUCCESS:
            setCookie([
                {
                    "name": "access_token",
                    "value": action.payload,
                    "expiry": 1
                }
            ]);
            return {
                ...state,
                isAuthenticated: true,
                accessToken: action.payload
            }
        default:
            return state;
    }
}
