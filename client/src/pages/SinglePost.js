import React, { useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import {
    Grid,
    Card,
    Image,
    Button,
    Icon,
    Feed,
    Comment,
    Form,
    TextArea,
} from 'semantic-ui-react'
import moment from 'moment'

import { AuthContext } from '../context/AuthContext'

export default function SinglePost(props) {
    const postID = props.match.params.postID

    const { user } = useContext(AuthContext)

    const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postID,
        },
    })

    let postMarkup
    if (!getPost) {
        postMarkup = <p>Loading post..</p>
    } else {
        const {
            id,
            body,
            createdAt,
            username,
            comments,
            likes,
            likeCount,
            commentCount,
        } = getPost

        console.log(comments && comments.map((post) => post))
        postMarkup = (
            <Grid padded>
                <Grid.Row
                    style={{
                        justifyContent: 'center',
                        padding: '2em',
                        marginTop: '2em',
                    }}
                >
                    <Grid.Column>
                        <Image
                            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                            size="massive"
                            float="right"
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card color="grey" id={id} fluid>
                            <Card.Content>
                                <Card.Header style={{ color: 'white' }}>
                                    {username}
                                </Card.Header>
                                <Card.Meta
                                    style={{
                                        color: 'white',
                                        fontSize: '0.8em',
                                    }}
                                >
                                    {moment(createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description
                                    style={{
                                        color: 'white',
                                        fontSize: '1.4em',
                                    }}
                                >
                                    {body}
                                    <br />
                                    <Button
                                        floated="right"
                                        style={{
                                            marginRight: '1.5em',
                                            marginTop: '8px',
                                        }}
                                        labelPosition="right"
                                        red
                                    >
                                        <Icon name="like" size="large" fitted />
                                        <div class="likeCount">{likeCount}</div>
                                    </Button>
                                </Card.Description>
                            </Card.Content>

                            <Card.Content extra>
                                <Comment.Group>
                                    {comments &&
                                        comments.map((comment) => (
                                            <Comment key={comment.id}>
                                                <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                                                <Comment.Content>
                                                    <Comment.Author as="a">
                                                        {comment.username}
                                                    </Comment.Author>
                                                    <Comment.Metadata>
                                                        <div>
                                                            {moment(
                                                                comment.createdAt
                                                            ).fromNow()}
                                                        </div>
                                                    </Comment.Metadata>
                                                    <Comment.Text>
                                                        {comment.body}
                                                    </Comment.Text>
                                                    <Comment.Actions>
                                                        <Comment.Action>
                                                            <Button
                                                                style={{
                                                                    marginLeft:
                                                                        '0.25em',
                                                                }}
                                                                labelPosition="right"
                                                                red
                                                            >
                                                                <Icon name="like" />
                                                                {
                                                                    comment.likeCount
                                                                }
                                                            </Button>
                                                        </Comment.Action>
                                                    </Comment.Actions>
                                                </Comment.Content>
                                            </Comment>
                                        ))}
                                    <Form reply>
                                        <TextArea
                                            rows={1}
                                            style={{ maxHeight: 70 }}
                                            placeholder="Tell us more"
                                        />
                                        <Button
                                            content="Add Reply"
                                            labelPosition="left"
                                            icon="edit"
                                            primary
                                        />
                                    </Form>
                                </Comment.Group>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup
}

const FETCH_POST_QUERY = gql`
    query($postID: ID!) {
        getPost(postID: $postID) {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                body
                username
                likeCount
                createdAt
            }
        }
    }
`
