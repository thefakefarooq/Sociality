import React, { useState } from 'react'
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

import { useForm } from '../util/hooks'

export default function Login(props) {
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
        update(_, result) {
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
        <div>
            <Segment
                inverted
                style={{
                    minHeight: 200,
                    padding: '3em 5em',
                    marginLeft: 200,
                    marginRight: 200,
                    marginTop: 100,
                }}
                vertical
            >
                <Form inverted onSubmit={onSubmit} noValidate>
                    <Container textAlign="center">
                        <h1>LOGIN</h1>
                    </Container>
                    <Segment inverted style={{ padding: 4 }}></Segment>
                    <Form.Group unstackable>
                        <Form.Field width={3} style={{ marginRight: 12 }}>
                            {' '}
                        </Form.Field>
                        <Icon name="user" size="big" style={{ marginTop: 3 }} />
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
                    <Segment inverted style={{ padding: 7 }}></Segment>
                    <Form.Group unstackable>
                        <Form.Field width={3} style={{ marginRight: 12 }}>
                            {' '}
                        </Form.Field>
                        <Icon name="lock" size="big" style={{ marginTop: 3 }} />
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
                    {Object.keys(general).length > 0 && (
                        <div class="centerRegion">
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
                    <Container textAlign="center">
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
            </Segment>
        </div>
    )
}
