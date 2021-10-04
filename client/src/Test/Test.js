import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import Signin from './Siginin'
import Signup from './Signup'

function Test() {
    return (
        <>
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
            </Switch>
        </>
    )
}

export default Test
