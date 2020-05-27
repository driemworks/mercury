var UploadSchema = {
    type: 'object',
    properties: {
        
        filename: {
            type: 'string',
            required: true
        },

        content: {
            type: 'string',
            required: true
        },

        date: {
            type: 'date',
            required: true
        },

        type: {
            type: 'string',
            required: true
        }
    }
}

export default UploadSchema;