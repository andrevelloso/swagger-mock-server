const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerMockApi = require('swagger-mock-api');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Swagger Setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Mock Server API',
            version: '1.0.0',
            description: 'Mock server for testing APIs based on Swagger definitions',
        },
    },
    apis: ['./swagger/*.yaml'], // Point to your Swagger file(s)
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mock Server Setup
app.use(
    swaggerMockApi({
        swaggerFile: path.join(__dirname, './swagger/swagger.yaml'), // Path to your Swagger file
        watch: true, // Reload automatically when the Swagger file is changed
    })
);

app.listen(PORT, () => {
    console.log(`Mock server running at http://localhost:${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
