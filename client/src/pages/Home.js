import React from 'react'
import { useQuery } from '@apollo/client'
import { Container, Grid, Dimmer, Loader } from 'semantic-ui-react'
import gql from 'graphql-tag'

import PostCard from '../components/PostCard'

/* 
DARK MODE !
            <style>
                {`
                html, body {
                    background-color: #262729 !important;
                    color:white
                }
            `}
            </style>
            
*/

function Home() {
    const { loading, data: { getPosts: posts } = {} } = useQuery(
        FETCH_POSTS_QUERY
    )

    return (
        <Container>
            <Grid centered className="loading">
                <Grid.Row></Grid.Row>
                <Grid.Row>
                    <h1>Recent Posts</h1>
                </Grid.Row>
                <Grid.Row></Grid.Row>
                {loading ? (
                    <Dimmer active>
                        <Loader size="massive">Loading</Loader>
                    </Dimmer>
                ) : (
                    posts &&
                    posts.map((post) => (
                        <Grid.Row centered columns={4}>
                            <Grid.Column key={post.id}>
                                <PostCard post={post} />
                            </Grid.Column>
                        </Grid.Row>
                    ))
                )}
            </Grid>
        </Container>
    )
}
const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
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
                username
                createdAt
                body
                likeCount
                likes {
                    username
                }
            }
        }
    }
`
export default Home
