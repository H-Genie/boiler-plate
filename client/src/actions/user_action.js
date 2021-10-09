import axios from 'axios'
import { SIGNIN, SIGNUP, AUTH } from './types'

export function signin(dataToSubmit) {
    const request = axios.post('/signin', dataToSubmit)
        .then(response => response.data)

    return {
        type: SIGNIN,
        payload: request
    }
}

export function signup(dataToSubmit) {
    const request = axios.post('/signup', dataToSubmit)
        .then(response => response.data)

    return {
        type: SIGNUP,
        payload: request
    }
}

export function auth() {
    const request = axios.get('/auth')
        .then(response => response.data)

    return {
        type: AUTH,
        payload: request
    }
}