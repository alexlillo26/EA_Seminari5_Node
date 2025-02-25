const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "NBA Players API",
            version: "1.0.0",
            description: "API para gestionar jugadores de la NBA"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local"
            }
        ]
    },
    apis: ["./src/routes/*.js"], // Indica dónde están las rutas con documentación
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📄 Swagger docs disponibles en: http://localhost:3000/api-docs");
};

module.exports = swaggerDocs;
