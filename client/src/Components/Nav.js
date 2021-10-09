import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

function Nav(props) {
    const onClick = () => {
        axios.get('/logout')
            .then(response => {
                if (response.data.success) {
                    props.history.push('/signin')
                } else {
                    alert('로그인을 먼저 해주세요')
                }
            })
    }

    return (
        <nav
            style={{
                width: '300px',
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <Link to={'/'}>Home</Link>
            <Link to={'/signin'}>Sign In</Link>
            <Link to={'/signup'}>Sign Up</Link>
            <button onClick={onClick}>Log Out</button>
        </nav>
    )
}

export default withRouter(Nav)