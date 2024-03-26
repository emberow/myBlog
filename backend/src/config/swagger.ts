export default {
    definition: {
        swagger: '2.0',
        info: {
            title: 'myblog API', // Title of the documentation
            version: '1.0.0', // Version of the app
            description: 'This is the REST API for myblog', // short description of the app
        },
    },
    apis: ['./src/docs/**/*.yaml'],
};