import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import { VariablesAreInputTypesRule } from 'graphql'

import { FETCH_POSTS_QUERY } from '../util/getPosts'

export default function DeleteButton({ postID, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false)

    const DELETE_POST_MUTATION = gql`
        mutation deletePost($postID: ID!) {
            deletePost(postID: $postID)
        }
    `

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy) {
            setConfirmOpen(false)
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            })
            data.getPosts = data.getPosts.filter((p) => p.id !== postID)
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
            if (callback) callback()
        },

        variables: {
            postID,
        },
    })

    return (
        <>
            <Button
                circular
                compact
                floated="right"
                color="black"
                icon="trash alternate"
                size="tiny"
                onClick={() => setConfirmOpen(true)}
            />
            <Confirm
                style={{ textAlign: 'center', fontSize: 'xx-large' }}
                open={confirmOpen}
                content="ARE YOU SURE?"
                cancelButton="CANCEL"
                confirmButton="DELETE"
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}
                size="small"
            />
        </>
    )
}
