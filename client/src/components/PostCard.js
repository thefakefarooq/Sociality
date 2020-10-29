import React from 'react'
import { Feed, Icon, Label } from 'semantic-ui-react'
import moment from 'moment'

export default function PostCard({
    post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
    return (
        <Feed size="large">
            <Feed.Event>
                <Feed.Label image="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
                <Feed.Content>
                    <Feed.Summary>
                        <a>{username}</a> posted
                        <Feed.Date>{moment(createdAt).fromNow()}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>{body}</Feed.Extra>
                    <Feed.Meta>
                        <Feed.Like>
                            <Icon name="like" />
                            {likeCount} Likes
                        </Feed.Like>
                        <Feed.Like>
                            <Icon name="comments" />
                            {commentCount} Comments
                        </Feed.Like>
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>
        </Feed>
    )
}
