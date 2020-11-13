import React, { useContext, useState } from 'react'
import { Form, Segment, Button, Icon, Container } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

import { AuthContext } from '../context/AuthContext'
import { useForm } from '../util/hooks'

export default function Register(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const REGISTER_USER = gql`
        mutation register(
            $username: String!
            $email: String!
            $password: String!
            $confirmPassword: String!
        ) {
            register(
                registerInput: {
                    username: $username
                    email: $email
                    password: $password
                    confirmPassword: $confirmPassword
                }
            ) {
                id
                email
                username
                createdAt
                token
            }
        }
    `

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [addUser] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData)
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },

        variables: values,
    })

    function registerUser() {
        addUser()
    }

    return (
        <div class="FormBox">
            <Segment
                inverted
                style={{ minHeight: 500, padding: '3em 5em' }}
                vertical
            >
                <Form inverted onSubmit={onSubmit} noValidate>
                    <div class="FormHeading">
                        <h1>REGISTER</h1>
                    </div>
                    <Segment inverted style={{ padding: 4 }}></Segment>
                    <Form.Field required error={errors.username ? true : false}>
                        <label>
                            <Icon name="user" />
                            Username
                        </label>
                        <Form.Input
                            placeholder="Username.."
                            width={4}
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
                    <Segment inverted style={{ padding: 7 }}></Segment>
                    <Form.Field required error={errors.email ? true : false}>
                        <label>
                            <Icon name="at" />
                            Email
                        </label>
                        <Form.Input
                            width={6}
                            placeholder="Email.."
                            name="email"
                            error={
                                errors.email ? { content: errors.email } : false
                            }
                            type="text"
                            value={values.email}
                            onChange={onChange}
                        />
                    </Form.Field>
                    <Segment inverted style={{ padding: 7 }}></Segment>
                    <Form.Group unstackable widths="equal">
                        <Form.Field
                            required
                            error={errors.password ? true : false}
                        >
                            <label>
                                <Icon name="asterisk" />
                                Password
                            </label>
                            <Form.Input
                                fluid
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
                        <Form.Field
                            required
                            error={errors.confirmPassword ? true : false}
                        >
                            <label>
                                <Icon name="asterisk" /> Confirm Password
                            </label>
                            <Form.Input
                                fluid
                                placeholder="Confirm Password.."
                                name="confirmPassword"
                                error={
                                    errors.confirmPassword
                                        ? { content: errors.confirmPassword }
                                        : false
                                }
                                type="password"
                                value={values.confirmPassword}
                                onChange={onChange}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Container textAlign="center">
                        <Button
                            style={{ marginTop: '2em' }}
                            circular
                            type="submit"
                            animated
                            inverted
                            size="big"
                        >
                            <Button.Content visible>LET'S GO</Button.Content>
                            <Button.Content hidden>
                                <Icon name="thumbs up" />
                            </Button.Content>
                        </Button>
                    </Container>
                </Form>
            </Segment>
        </div>
    )
}
