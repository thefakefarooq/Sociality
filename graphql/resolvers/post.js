const { AuthenticationError, UserInputError } = require('apollo-server')
const { argsToArgsConfig } = require('graphql/type/definition')

const post = require('../../models/post')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await post.find().sort({ createdAt: -1 })
                return posts
            } catch (err) {
                throw new Error(err)
            }
        },

        async getPost(_, { postID }) {
            try {
                const Post = await post.findById(postID)
                if (Post) {
                    return Post
                } else throw new Error('Post not found')
            } catch (err) {
                throw new Error(err)
            }
        },
    },

    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context)

            if (body.trim() === '') {
                throw new Error('Post is empty')
            }

            const newPost = new post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
            })

            const Post = await newPost.save()

            context.pubsub.publish('NEW_POST', {
                newPost: Post,
            })

            return Post
        },

        async deletePost(_, { postID }, context) {
            const user = checkAuth(context)

            try {
                const Post = await post.findById(postID)
                if (Post) {
                    if (user.username === Post.username) {
                        await Post.delete()
                        return 'Post deleted successfully'
                    } else throw new AuthenticationError('Action not allowed')
                } else throw new UserInputError('Post not found')
            } catch (err) {
                throw new Error(err)
            }
        },
    },

    Subscription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST'),
        },
    },
}
