const { gql } = require('apollo-server')

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }

    type Comment {
        id: ID!
        body: String!
        username: String!
        likes: [Like]!
        likeCount: Int!
        createdAt: String!
    }

    type Like {
        id: ID!
        username: String!
        createdAt: String!
    }

    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query {
        getPosts: [Post]
        getPost(postID: ID!): Post
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postID: ID!): String!
        createComment(postID: ID!, body: String!): Post!
        deleteComment(postID: ID!, commentID: ID!): Post!
        likePost(postID: ID!): Post!
        likeComment(postID: ID!, commentID: ID!): Post!
    }

    type Subscription {
        newPost: Post!
    }
`
