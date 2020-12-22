import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import { VariablesAreInputTypesRule } from 'graphql'

export default function DeleteButton({ postID }) {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const DELETE_POST_MUTATION = gql`
        mutation deletePost($postID: ID!) {
            deletePost(postID: $postID)
        }
    `

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update() {
            setConfirmOpen(false)
            // TODO: remove post from cache
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
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}
            />
        </>
    )
}
