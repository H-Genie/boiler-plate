import React from 'react'
import axios from 'axios'


function Test() {
    const signin = () => {
        axios.post('/signin', { id: "ses2000hj", password: "st22721" })
            .then(response => console.log(response))
    }

    const signup = () => {
        axios.post('/signup', { id: "h0636067", password: "st22721" })
            .then(response => console.log(response))
    }

    const logout = () => {
        axios.get('/logout')
            .then(response => console.log(response))
    }

    return (
        <div>
            <p>Hello World!</p>
            <button onClick={signin}>로그인</button>
            <button onClick={signup}>회원가입</button>
            <button onClick={logout}>로그아웃</button>
        </div>
    )
}

export default Test