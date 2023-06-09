export default {
    definition: {
        swagger: '2.0',
        info: {
            title: 'REST API for my App', // Title of the documentation
            version: '1.0.0', // Version of the app
            description: 'This is the REST API for my product', // short description of the app
        },
    },
    apis: ['./src/docs/**/*.yaml'],
};