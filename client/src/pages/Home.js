import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Dimmer,
    Icon,
    Header,
    Grid,
    Loader,
    Button,
    Sticky,
    Segment,
    Container,
    GridColumn,
    Form,
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

    const HomePage = user ? (
        <div class="HomePage">
            <Dimmer.Dimmable dimmed={dimming} style={{ height: '100vh' }}>
                <Grid centered className="loading">
                    <div class="centerHeading">
                        <h1>Recent Posts</h1>
                    </div>
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

                    <div class="item">
                        <Button
                            circular
                            size="massive"
                            icon="pencil"
                            onClick={contentHide}
                            floated="right"
                            style={{ fontSize: '3em' }}
                        />
                    </div>
                </Grid>
                <Dimmer active={dimming} onClickOutside={contentShow}>
                    <Form inverted>
                        <div class="FormHeading">
                            <h1>
                                TALK TO THE <Icon name="globe" size="big" />
                                {'  '}
                            </h1>
                        </div>
                        <Form.Input size="large" placeholder="Write here.." />
                    </Form>
                </Dimmer>
            </Dimmer.Dimmable>
        </div>
    ) : (
        <div class="HomePage">
            <div class="centerHeading">
                <h1>Login First</h1>
            </div>
        </div>
    )

    return HomePage
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
