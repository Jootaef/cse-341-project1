const swaggerAutogen = require('swagger-autogen')()

const doc = {   
    info: {
        title: 'Users Api',
        description: 'Users Api ',
    },
    host: "localhost:3001",
    schemes: ['http', 'http'],
  };

const outputFile = './swagger.json' 
const endpointsFiles = ['./controllers/users.js']

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);