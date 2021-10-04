import React from 'react'
import axios from 'axios'

function Signin() {
    const signIn = e => {
        e.preventDefault();

        axios.post('/signin',
            {
                id: e.target[0].value,
                password: e.target[1].value
            }
        )
            .then(response => console.log(response))
    }

    return (
        <>
            <h2>Sign In</h2>
            <form onSubmit={e => signIn(e)}>
                <input type="text" name="id" placeholder="id" />
                <input type="password" name="password" placeholder="password" />
                <input type="submit" value="Sign in" />
            </form>
        </>
    )
}

export default Signin