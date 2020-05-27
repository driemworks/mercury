var UserSchema = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            required: true
        },
        address: {
            type: 'string',
            required: true
        },
        publicKey: {
            type: 'string',
            required: true
        }
    }
}

export default UserSchema;