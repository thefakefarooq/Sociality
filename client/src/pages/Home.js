import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Dimmer, Grid, Loader, Button } from 'semantic-ui-react'

import { AuthContext } from '../context/AuthContext'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { FETCH_POSTS_QUERY } from '../util/getPosts'

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
    }
    const contentShow = () => {
        setDimming(false)
    }

    const HomePage = user ? (
        <div class="HomePage">
            <Dimmer.Dimmable dimmed={dimming} style={{ height: '100vh' }}>
                <Grid centered className="loading">
                    <div class="centerHeading"></div>
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
                    <PostForm />
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

export default Home
