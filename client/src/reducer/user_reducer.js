import { SIGNIN, SIGNUP, AUTH } from '../actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case SIGNIN:
            return { ...state, loginSuccess: action.payload }
            break;
        case SIGNUP:
            return { ...state, register: action.payload }
            break;
        case AUTH:
            return { ...state, userData: action.payload }
            break;
        default:
            return state;
    }
}