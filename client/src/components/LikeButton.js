import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { Button, Icon } from 'semantic-ui-react'

export default function LikeButton({
    user,
    post: { id, likeCount, likes },
    large,
    floated,
}) {
    const LIKE_POST_MUTATION = gql`
        mutation likePost($postID: ID!) {
            likePost(postID: $postID) {
                id
                likes {
                    id
                    username
                }
                likeCount
            }
        }
    `

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postID: id },
    })

    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true)
        } else setLiked(false)
    }, [user, likes])

    const likeButton = user ? (
        liked ? (
            <Button
                style={{
                    marginRight: '2em',
                }}
                labelPosition="right"
                floated={floated}
                color="red"
                size={large}
                inverted
                onClick={likePost}
            >
                <Icon name="like" />
                {likeCount}
            </Button>
        ) : (
            <Button
                style={{
                    marginRight: '2em',
                }}
                labelPosition="right"
                floated={floated}
                size={large}
                color="yellow"
                inverted
                active
                onClick={likePost}
            >
                <Icon name="like" />
                {likeCount}
            </Button>
        )
    ) : (
        <Button
            style={{
                marginRight: '2em',
            }}
            labelPosition="right"
            floated={floated}
            size={large}
            color="yellow"
            inverted
            active
            as={Link}
            to="/login"
        >
            <Icon name="like" />
            {likeCount}
        </Button>
    )

    return likeButton
}
