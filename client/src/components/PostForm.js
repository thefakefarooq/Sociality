import React from 'react'
import { Form, Icon, Button } from 'semantic-ui-react'
import { useForm } from '../util/hooks'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

export default function PostForm() {
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
    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(_, result) {
            console.log(result)
            values.body = ''
        },
    })

    function createPostCallback() {
        createPost()
    }

    return (
        <Form onSubmit={onSubmit} inverted>
            <div class="FormHeading">
                <h1>
                    TALK TO THE <Icon name="globe" size="big" />
                    {'  '}
                </h1>
            </div>
            <Form.Input
                size="large"
                placeholder="Write here.."
                name="body"
                onChange={onChange}
                value={values.body}
            />
            <Button
                style={{ marginTop: '1em' }}
                circular
                type="submit"
                inverted
                size="big"
            >
                <Icon name="angle right" size="large" />
            </Button>
        </Form>
    )
}
