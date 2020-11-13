import React from 'react'
import { Feed, Icon, Card, Button } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

export default function PostCard({
    post: { body, createdAt, id, username, likeCount, commentCount, comments },
}) {
    if (comments[0]) console.log(comments[0].username)
    return (
        <Card color="grey" id={id}>
            <Card.Content>
                <Feed size="large">
                    <Feed.Event>
                        <Feed.Label image="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
                        <Feed.Content>
                            <Feed.Summary>
                                <a>{username}</a> posted
                                <Feed.Date>
                                    {moment(createdAt).fromNow()}
                                </Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra text style={{ marginBottom: '1em' }}>
                                {body}
                            </Feed.Extra>
                            <Feed.Meta>
                                <Feed.Like
                                    as={Link}
                                    to="/login"
                                    style={{
                                        marginRight: '2em',
                                    }}
                                >
                                    <Icon
                                        name="like"
                                        style={{ marginRight: 2 }}
                                    />
                                    {'       '}
                                    {likeCount}
                                </Feed.Like>
                                <Button labelPosition="right" inverted>
                                    <Icon name="comments" />
                                    {commentCount}
                                </Button>
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
            </Card.Content>
            <Card.Content extra style={{ marginTop: -11 }}>
                <h4>
                    {comments[0]
                        ? comments[0].username + ' : ' + comments[0].body
                        : ''}
                </h4>
            </Card.Content>
        </Card>
    )
}
