import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { signup } from '../actions/user_action'
import { withRouter } from 'react-router-dom'

function Signup(props) {
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const onIdChange = e => setId(e.currentTarget.value);
    const onPasswordChange = e => setPassword(e.currentTarget.value);
    const onconfirmedPasswordChange = e => setConfirmedPassword(e.currentTarget.value)
    const onSubmit = e => {
        e.preventDefault();
        if (password !== confirmedPassword) {
            return alert('비밀번호가 일치하지 않습니다')
        }

        let body = { id, password }
        dispatch(signup(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/signin')
                } else {
                    alert(response.payload.message)
                }
            })
    }

    return (
        <div className="align_center">
            <h2>Sign Up</h2>
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
                    type="password"
                    value={confirmedPassword}
                    placeholder="password_confirmed"
                    autoComplete="off"
                    onChange={onconfirmedPasswordChange}
                />
                <input
                    type="submit"
                    value="Sign Up"
                />
            </form>
        </div>
    )
}

export default withRouter(Signup)