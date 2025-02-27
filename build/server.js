"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const playerRoutes_1 = __importDefault(require("./routes/playerRoutes"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware para registrar todas las solicitudes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
// Middleware para parsear JSON
app.use(express_1.default.json());
// Conexión a MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/seminarinode')
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
        servers: [
            {
                url: 'http://localhost:3000', // URL del servidor
            },
        ],
    },
    apis: ['./src/routes/playerRoutes.ts'], // Ruta donde se encuentran tus archivos de rutas
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Usar las rutas de jugadores
app.use('/players', playerRoutes_1.default);
// Rutas de ejemplo
app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
