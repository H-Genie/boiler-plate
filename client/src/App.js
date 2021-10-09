import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'
import Nav from './Components/Nav'
import Home from './Components/Home'
import Signin from './Components/Siginin'
import Signup from './Components/Signup'
import Auth from './hoc/auth'

function App() {
    return (
        <>
            <Nav />
            <Switch>
                <Route exact path="/" component={Auth(Home, null)} />
                <Route exact path="/signin" component={Auth(Signin, false)} />
                <Route exact path="/signup" component={Auth(Signup, false)} />
            </Switch>
        </>
    )
}

export default App