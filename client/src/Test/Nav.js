import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav
            style={{
                width: '200px',
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <Link to={'/'}>Home</Link>
            <Link to={'/signin'}>Sign In</Link>
            <Link to={'/signup'}>Sign Up</Link>
        </nav>
    )
}

export default Nav