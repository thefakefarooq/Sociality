const postResolvers = require('./post')
const userResolvers = require('./user')
const commentResolvers = require('./comment')
const likeResolvers = require('./like')

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length,
    },
    Comment: {
        likeCount: (parent) => parent.likes.length,
    },
    Query: {
        ...postResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation,
        ...likeResolvers.Mutation,
    },
    Subscription: {
        ...postResolvers.Subscription,
    },
}
