module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {}
    if (username.trim() === '') {
        errors.username = 'Enter a username'
    }
    if (email.trim() === '') {
        errors.email = 'Enter an email'
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address'
        }
    }
    if (password === '') {
        errors.password = 'Enter a password'
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {}
    if (username.trim() === '') {
        errors.username = 'Enter a username'
    }
    if (password === '') {
        errors.password = 'Enter a password'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
}
