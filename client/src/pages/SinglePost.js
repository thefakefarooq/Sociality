import React, { useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import {
    Grid,
    Card,
    Image,
    Button,
    Dimmer,
    Loader,
    Comment,
    Form,
    TextArea,
} from 'semantic-ui-react'
import moment from 'moment'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'

import { AuthContext } from '../context/AuthContext'

export default function SinglePost(props) {
    const postID = props.match.params.postID

    const { user } = useContext(AuthContext)

    const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postID,
        },
    })

    function deletePostCallback() {
        props.history.push('/')
    }

    let postMarkup
    if (!getPost) {
        postMarkup = (
            <Dimmer active>
                <Loader size="massive">Loading</Loader>
            </Dimmer>
        )
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
                                    {user && user.username === username && (
                                        <DeleteButton
                                            postID={id}
                                            callback={deletePostCallback}
                                        />
                                    )}
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
                                    <LikeButton
                                        user={user}
                                        post={{ id, likes, likeCount }}
                                        large="big"
                                        floated="right"
                                    />
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
                                                            <LikeButton
                                                                user={user}
                                                                post={{
                                                                    id,
                                                                    likes,
                                                                    likeCount,
                                                                }}
                                                                floated="right"
                                                            />
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
