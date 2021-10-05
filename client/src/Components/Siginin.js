import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { signin } from '../actions/user_action'

function Signin(props) {
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onIdChange = e => setId(e.currentTarget.value);
    const onPasswordChange = e => setPassword(e.currentTarget.value);
    const onSubmit = e => {
        e.preventDefault();

        let body = { id, password }
        dispatch(signin(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert(response.payload.message)
                }
            })
    }

    return (
        <div className="align_center">
            <h2>Sign In</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={id}
                    placeholder="id"
                    onChange={onIdChange}
                />
                <input
                    type="password"
                    value={password}
                    placeholder="password"
                    autoComplete="off"
                    onChange={onPasswordChange}
                />
                <input
                    type="submit"
                    value="Sign in"
                />
            </form>
        </div>
    )
}

export default Signin