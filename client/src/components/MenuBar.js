import React, { useState } from 'react'
import { Menu, Segment, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function MenuBar() {
    const pathName = window.location.pathname
    const path = pathName === '/' ? 'home' : pathName.substr(1)

    const [activeItem, setActiveItem] = useState(path)
    const handleItemClick = (e, { name }) => setActiveItem(name)

    return (
        <Segment inverted>
            <Menu inverted pointing secondary icon>
                <Menu.Item
                    name="home"
                    onClick={handleItemClick}
                    as={Link}
                    to="/"
                >
                    <Icon name="staylinked" size="large" />
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button
                            as={Link}
                            to="/login"
                            inverted
                            active={activeItem === 'login'}
                            onClick={handleItemClick}
                        >
                            LOGIN
                        </Button>
                        <Button
                            as={Link}
                            to="/register"
                            inverted
                            active={activeItem === 'register'}
                            onClick={handleItemClick}
                            style={{ marginLeft: '0.7em' }}
                        >
                            SIGNUP
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </Segment>
    )
}
