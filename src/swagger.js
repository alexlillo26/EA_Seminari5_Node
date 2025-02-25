import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Definir las opciones de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'NBA Player API',
      version: '1.0.0',
      description: 'API para gestionar jugadores de la NBA',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia esto si usas otro puerto
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Ruta de los archivos de las rutas que contienen la documentación de las API
};

// Crear la especificación Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Función para servir la documentación de Swagger
const swaggerDocs = (app) => {
  // Usar Swagger UI para mostrar la documentación
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
