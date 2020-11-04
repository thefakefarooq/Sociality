const { UserInputError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {
    validateRegisterInput,
    validateLoginInput,
} = require('../../util/validator')
const { SECRET_KEY } = require('../../config')
const user = require('../../models/user')

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    )
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const { valid, errors } = validateLoginInput(username, password)
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }

            const User = await user.findOne({ username })

            if (!User) {
                errors.general = 'User not found'
                throw new UserInputError('User not found', { errors })
            }

            const match = await bcrypt.compare(password, User.password)
            if (!match) {
                errors.password = 'Wrong Credentials'
                throw new UserInputError('Wrong Credentials', { errors })
            }

            const token = generateToken(User)

            return {
                ...User._doc,
                id: User.id,
                token,
            }
        },

        async register(
            _,
            { registerInput: { username, email, password, confirmPassword } }
        ) {
            //validate user data
            const { valid, errors } = validateRegisterInput(
                username,
                email,
                password,
                confirmPassword
            )
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }

            //Make sure user doesnt already exist
            const User = await user.findOne({ username })

            if (User) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken',
                    },
                })
            }

            //Hash the password and create auth token
            password = await bcrypt.hash(password, 12)

            const newUser = new user({
                email,
                username,
                password,
                createdAt: new Date().toISOString(),
            })

            const res = await newUser.save()

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res.id,
                token,
            }
        },
    },
}
