import { IS_ADMIN, EMPLOYEE_ID } from '../actions/types';

const initialState = {
    isAdmin: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case IS_ADMIN:
            return {
                ...state,
                isAdmin: action.payload
            }
            case EMPLOYEE_ID:
                return {
                    ...state,
                    id: action.payload
                }
        default:
            return state;
    }
}