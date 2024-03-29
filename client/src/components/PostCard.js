import React, { useContext } from 'react'
import { Feed, Icon, Card, Button } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import LikeButton from './LikeButton'

export default function PostCard({
    post: {
        body,
        createdAt,
        id,
        username,
        likeCount,
        commentCount,
        comments,
        likes,
    },
}) {
    const { user } = useContext(AuthContext)

    return (
        <Card color="grey" id={id}>
            <Card.Content>
                <Feed size="large">
                    <Feed.Event>
                        <Feed.Label image="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
                        <Feed.Content>
                            <Feed.Summary>
                                <a>{username}</a> posted
                                <Feed.Date as={Link} to={`posts/${id}`}>
                                    {moment(createdAt).fromNow()}
                                </Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra text style={{ marginBottom: '1em' }}>
                                {body}
                            </Feed.Extra>
                            <Feed.Meta>
                                <LikeButton
                                    user={user}
                                    post={{ id, likes, likeCount }}
                                />

                                <Button labelPosition="right" inverted>
                                    <Icon name="comments" />
                                    {commentCount}
                                </Button>
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
            </Card.Content>
            <Card.Content extra style={{ marginTop: -11, textAlign: 'left' }}>
                {comments[0]
                    ? comments[0].username + ': ' + comments[0].body
                    : ''}
            </Card.Content>
        </Card>
    )
}
