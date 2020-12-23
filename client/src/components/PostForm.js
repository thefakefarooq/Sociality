import React, { useState } from 'react'
import { Form, Icon, Button } from 'semantic-ui-react'
import { useForm } from '../util/hooks'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

import { FETCH_POSTS_QUERY } from '../util/getPosts'

export default function PostForm({ dimming, clear, clearFunction }) {
    const [errors, setErrors] = useState({})
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: '',
    })
    const CREATE_POST_MUTATION = gql`
        mutation createPost($body: String!) {
            createPost(body: $body) {
                id
                body
                createdAt
                username
                likes {
                    username
                }
                likeCount
                comments {
                    body
                    username
                    likes {
                        username
                    }
                }
                commentCount
            }
        }
    `

    const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            })
            data.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
            values.body = ''
            dimming()
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
            clearFunction()
        },
    })

    function createPostCallback() {
        createPost()
    }

    return (
        <Form onSubmit={onSubmit} inverted>
            <div className="FormHeading">
                <h1>
                    TALK TO THE <Icon name="globe" size="big" />
                    {'  '}
                </h1>
            </div>
            <Form.Input
                style={{ paddingTop: '0.8em' }}
                size="large"
                placeholder="Write here.."
                name="body"
                error={
                    error && clear
                        ? { content: error.graphQLErrors[0].message }
                        : false
                }
                onChange={onChange}
                value={values.body}
            />
            <Button
                style={{ marginTop: '2em' }}
                circular
                loading={loading ? true : false}
                type="submit"
                inverted
                size="big"
            >
                <Icon name="angle right" size="large" />
            </Button>
        </Form>
    )
}
