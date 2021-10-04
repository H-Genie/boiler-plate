import React from 'react'
import axios from 'axios'

function Signup() {
    const signUp = e => {
        e.preventDefault();

        axios.post('/signup',
            {
                id: e.target[0].value,
                password: e.target[1].value
            }
        )
            .then(response => console.log(response))
    }

    return (
        <div className="align_center">
            <h2>Sign Up</h2>
            <form onSubmit={e => signUp(e)}>
                <input type="text" name="id" placeholder="id" />
                <input type="password" name="password" placeholder="password" />
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    )
}

export default Signup