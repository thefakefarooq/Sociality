import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Dimmer,
    Icon,
    Header,
    Grid,
    Loader,
    Button,
    Segment,
    Container,
    GridColumn,
} from 'semantic-ui-react'
import gql from 'graphql-tag'

import { AuthContext } from '../context/AuthContext'
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
    const [dimming, setDimming] = useState(false)

    const { user } = useContext(AuthContext)
    const { loading, data: { getPosts: posts } = {} } = useQuery(
        FETCH_POSTS_QUERY
    )

    const contentHide = () => {
        setDimming(true)
        console.log('Hiding ', dimming)
    }
    const contentShow = () => {
        setDimming(false)
        console.log('Showing ', dimming)
    }

    return (
        <Dimmer.Dimmable dimmed={dimming}>
            <Grid centered className="loading">
                <div class="centerHeading">
                    <h1>Recent Posts</h1>
                </div>
                <Grid.Row></Grid.Row>
                {loading ? (
                    <Dimmer active>
                        <Loader size="massive">Loading</Loader>
                    </Dimmer>
                ) : (
                    posts &&
                    posts.map((post) => (
                        <div class="centerCards">
                            <Grid.Column key={post.id}>
                                <PostCard post={post} />
                            </Grid.Column>
                        </div>
                    ))
                )}

                <div
                    class="item"
                    style={{ width: '-moz-available', justifyContent: 'right' }}
                >
                    <Button
                        circular
                        size="massive"
                        icon="settings"
                        onClick={contentHide}
                        floated="right"
                        style={{ fontSize: '3em' }}
                    />
                </div>
            </Grid>
            <Dimmer active={dimming} onClickOutside={contentShow}>
                <Header as="h2" icon inverted>
                    <Icon name="heart" />
                    Dimmed Message!
                </Header>
            </Dimmer>
        </Dimmer.Dimmable>
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
