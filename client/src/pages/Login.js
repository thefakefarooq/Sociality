import React, { useContext, useState } from 'react'
import {
    Form,
    Segment,
    Button,
    Icon,
    Container,
    Message,
} from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

import { AuthContext } from '../context/AuthContext'
import { useForm } from '../util/hooks'

export default function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const LOGIN_USER = gql`
        mutation login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                id
                email
                username
                createdAt
                token
            }
        }
    `

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: '',
    })

    const [loginUser] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData)
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },

        variables: values,
    })

    function loginUserCallback() {
        loginUser()
    }

    const { general = {} } = errors
    return (
        <div class="FormBox">
            <Segment inverted vertical>
                <div class="LoginForm">
                    <Form inverted onSubmit={onSubmit} noValidate>
                        <div class="FormHeading">
                            <h1>LOGIN</h1>
                        </div>
                        <div class="LoginFields">
                            <Form.Group unstackable>
                                <Form.Field
                                    width={3}
                                    style={{ marginLeft: '3em' }}
                                >
                                    {' '}
                                </Form.Field>
                                <Icon
                                    name="user"
                                    size="big"
                                    style={{ marginTop: 3 }}
                                />
                                <Form.Field
                                    required
                                    error={errors.username ? true : false}
                                    width={11}
                                >
                                    <Form.Input
                                        placeholder="Username.."
                                        width={11}
                                        name="username"
                                        error={
                                            errors.username
                                                ? { content: errors.username }
                                                : false
                                        }
                                        type="text"
                                        value={values.username}
                                        onChange={onChange}
                                    />
                                </Form.Field>
                            </Form.Group>
                        </div>
                        <div class="LoginFields">
                            <Form.Group unstackable>
                                <Form.Field
                                    width={3}
                                    style={{ marginLeft: '3em' }}
                                >
                                    {' '}
                                </Form.Field>
                                <Icon
                                    name="lock"
                                    size="big"
                                    style={{ marginTop: 3 }}
                                />
                                <Form.Field
                                    width={11}
                                    required
                                    error={errors.password ? true : false}
                                >
                                    <Form.Input
                                        fluid
                                        width={11}
                                        placeholder="Password.."
                                        name="password"
                                        error={
                                            errors.password
                                                ? { content: errors.password }
                                                : false
                                        }
                                        type="password"
                                        value={values.password}
                                        onChange={onChange}
                                    />
                                </Form.Field>
                            </Form.Group>
                        </div>
                        {Object.keys(general).length > 0 && (
                            <div className="centerRegion">
                                <ul className="list">
                                    <Message
                                        compact
                                        color="black"
                                        header={general}
                                        content="Create an account first.."
                                    />
                                </ul>
                            </div>
                        )}
                        <Container textAlign="center" style={{ marginTop: 10 }}>
                            <Button
                                style={{ marginTop: '1em' }}
                                circular
                                type="submit"
                                inverted
                                size="big"
                            >
                                <Icon name="angle right" size="large" />
                            </Button>
                        </Container>
                    </Form>
                </div>
            </Segment>
        </div>
    )
}
