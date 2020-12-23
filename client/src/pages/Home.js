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
    const [errors, setErrors] = useState(false)
    const { user } = useContext(AuthContext)
    const { loading, data: { getPosts: posts } = {} } = useQuery(
        FETCH_POSTS_QUERY
    )

    const contentHide = () => {
        setDimming(false)
        setErrors(false)
    }

    const initError = () => {
        setErrors(true)
        console.log('hit')
    }
    const HomePage = user ? (
        <div className="HomePage">
            <Dimmer.Dimmable dimmed={dimming} style={{ height: '100vh' }}>
                <Grid centered className="loading">
                    <div className="centerHeading"></div>
                    {loading ? (
                        <Dimmer active>
                            <Loader size="massive">Loading</Loader>
                        </Dimmer>
                    ) : (
                        posts &&
                        posts.map((post) => (
                            <div key={post.id} className="centerCards">
                                <Grid.Row key={post.id}>
                                    <PostCard key={post.id} post={post} />
                                </Grid.Row>
                            </div>
                        ))
                    )}

                    <div className="item">
                        <Button
                            circular
                            size="massive"
                            icon="pencil"
                            onClick={() => setDimming(true)}
                            floated="right"
                            style={{ fontSize: '3em' }}
                        />
                    </div>
                </Grid>
                <Dimmer active={dimming} onClickOutside={contentHide}>
                    <PostForm
                        clear={errors}
                        dimming={contentHide}
                        clearFunction={initError}
                    />
                </Dimmer>
            </Dimmer.Dimmable>
        </div>
    ) : (
        <div className="HomePage">
            <div className="centerHeading">
                <h1>Login First</h1>
            </div>
        </div>
    )

    return HomePage
}

export default Home
