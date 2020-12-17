import React from 'react'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

import { AuthProvider } from './context/AuthContext'
import AuthRoute from './util/AuthRoute'

import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'

function App() {
    return (
        <AuthProvider>
            <Router>
                <MenuBar />
                <Container style={{ width: 'auto' }}>
                    <Route exact path="/" component={Home} />
                    <AuthRoute exact path="/login" component={Login} />
                    <AuthRoute exact path="/register" component={Register} />
                    <Route exact path="/posts/:postID" component={SinglePost} />
                </Container>
            </Router>
        </AuthProvider>
    )
}

export default App
