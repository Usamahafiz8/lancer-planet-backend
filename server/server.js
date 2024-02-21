const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const { parse } = require('url');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const db = require('./server/config/db');
const fs = require('fs');
const path = require('path');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Next.js Express API with Swagger',
    version: '1.0.0',
    description: 'API documentation for the Next.js backend',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Local development server',
    },
  ],
};

// Options for the swagger-jsdoc
const swaggerOptions = {
  swaggerDefinition,
  apis: ['./server/routes/**/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Write Swagger JSON to a file
const swaggerPath = path.join(__dirname, 'api-docs', 'swagger.json');
fs.writeFileSync(swaggerPath, JSON.stringify(swaggerSpec, null, 2));

// Initialize Express app
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  // Swagger UI route
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerPath));

  // API routes
  server.use('/api/auth', require('./server/routes/api/auth'));
  server.use('/api', require('./server/routes/api/secured'));

  // Next.js pages
  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });

  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
  });
});
