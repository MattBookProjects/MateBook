const ResponseConst = { 
    RESPONSE_INTERNAL_ERROR: {
        status: 500,
        message: 'Internal server error'
    },
   RESPONSE_USERNAME_ALREADY_TAKEN: {
        status: 409,
        message: 'Username already taken'
    },
    RESPONSE_CREATED: {
        status: 201
    },
    RESPONSE_OK: {
        status: 200
    },
    RESPONSE_INCORRECT_USERNAME_OR_PASSWORD: {
        status: 401,
        message: 'Incorrect username or password' 
    },
    RESPONSE_UNAUTHENTICATED: {
        status: 401,
        message: 'User not authenticated'
    },
    RESPONSE_INVALID_INPUT: {
        status: 400,
        message: 'Invalid input'
    },
    RESPONSE_PERMISSION_DENIED: {
        status: 403,
        message: 'Permission denied'
    }
}

export default ResponseConst;