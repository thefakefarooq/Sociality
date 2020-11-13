import React, { useState, useContext } from 'react'
import { Menu, Segment, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

export default function MenuBar() {
    const { user = {}, logout } = useContext(AuthContext)
    const pathName = window.location.pathname
    const path = pathName === '/' ? 'home' : pathName.substr(1)

    const [activeItem, setActiveItem] = useState(path)
    const handleItemClick = (e, { name }) => setActiveItem(name)

    function logoutHandler(e, tempObject) {
        handleItemClick({}, tempObject)
        logout()
    }

    const menuBar = user ? (
        <Segment inverted>
            <Menu inverted pointing secondary icon>
                <Menu.Item
                    name="home"
                    as={Link}
                    to="/"
                    style={{ marginLeft: '2em' }}
                >
                    <Icon name="staylinked" size="large" />
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item
                        name="logout"
                        style={{ paddingLeft: 4, paddingRight: 20 }}
                        onClick={logoutHandler}
                    >
                        <Button inverted>LOGOUT</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </Segment>
    ) : (
        <Segment inverted>
            <Menu inverted pointing secondary icon>
                <Menu.Item
                    name="home"
                    onClick={handleItemClick}
                    as={Link}
                    to="/"
                    style={{ marginLeft: '2em' }}
                >
                    <Icon name="staylinked" size="large" />
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item
                        name="login"
                        style={{ paddingLeft: 0, paddingRight: 4 }}
                        onClick={handleItemClick}
                        as={Link}
                        to="/login"
                    >
                        <Button inverted active={activeItem === 'login'}>
                            LOGIN
                        </Button>
                    </Menu.Item>
                    <Menu.Item
                        name="register"
                        style={{ paddingLeft: 4, paddingRight: 20 }}
                        as={Link}
                        to="/register"
                        onClick={handleItemClick}
                    >
                        <Button inverted active={activeItem === 'register'}>
                            SIGNUP
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </Segment>
    )

    return menuBar
}
