import axios from 'axios'
import { SIGNIN } from './types'

export function signin(dataToSubmit) {
    const request = axios.post('/signin', dataToSubmit)
        .then(response => response.data)

    return {
        type: SIGNIN,
        payload: request
    }
}