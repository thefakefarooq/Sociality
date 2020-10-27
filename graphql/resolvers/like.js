const { AuthenticationError, UserInputError } = require('apollo-server')

const Post = require('../../models/post')
const user = require('../../models/user')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Mutation: {
        async likePost(_, { postID }, context) {
            const { username } = checkAuth(context)

            const post = await Post.findById(postID)
            if (post) {
                const likeIndex = post.likes.findIndex(
                    (like) => like.username === username
                )
                if (post.likes[likeIndex]) {
                    post.likes.splice(likeIndex, 1)
                } else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString(),
                    })
                }
                ;(await post).save()
                return post
            } else throw new UserInputError('Post not found')
        },

        async likeComment(_, { postID, commentID }, context) {
            const { username } = checkAuth(context)

            const post = await Post.findById(postID)
            if (post) {
                const commentIndex = post.comments.findIndex(
                    (c) => c.id === commentID
                )
                if (post.comments[commentIndex]) {
                    const likeIndex = post.comments[
                        commentIndex
                    ].likes.findIndex((like) => like.username === username)
                    if (post.comments[commentIndex].likes[likeIndex]) {
                        post.comments[commentIndex].likes.splice(likeIndex, 1)
                    } else {
                        post.comments[commentIndex].likes.push({
                            username,
                            createdAt: new Date().toISOString(),
                        })
                    }
                } else throw new UserInputError('Comment not found')

                await post.save()
                return post
            } else throw new UserInputError('Post not found')
        },
    },
}
