import express, { Application } from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import playerRoutes from './routes/playerRoutes';

const app: Application = express();
const port: number = 3000;

// Middleware para registrar todas las solicitudes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/seminarinode')
  .then(() => console.log('*******Conectado a la base de datos de MongoDB'))
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
    servers: [
      {
        url: 'http://localhost:3000',  // URL del servidor
      },
    ],
  },
  apis: ['./src/routes/playerRoutes.ts'], // Ruta donde se encuentran tus archivos de rutas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Usar las rutas de jugadores
app.use('/players', playerRoutes);


// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});