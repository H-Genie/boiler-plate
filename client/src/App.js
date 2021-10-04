import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'
import Nav from './Components/Nav'
import Home from './Components/Home'
import Signin from './Components/Siginin'
import Signup from './Components/Signup'

function App() {
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

export default App