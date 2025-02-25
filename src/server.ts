import express, { Application } from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app: Application = express();
const port: number = 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/your-db-name')
  .then(() => console.log('Conectado a la base de datos de MongoDB'))
  .catch((error) => console.log('Error al conectar a la base de datos', error));

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Jugadores',
      version: '1.0.0',
      description: 'Documentación de la API para gestionar jugadores',
    },
  },
  apis: ['./src/routes/*.ts'], // Ruta donde se encuentran tus archivos de rutas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de ejemplo (añade más según sea necesario)
app.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
