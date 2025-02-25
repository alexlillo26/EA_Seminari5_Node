const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const playerRoutes = require(path.resolve(__dirname, "routes/playerRoutes"));
const swaggerDocs = require("./swagger");

const app = express();
app.use(express.json());

// Conectar con MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/nba", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB conectada"))
    .catch(err => console.error("Error al conectar con MongoDB:", err));

// Rutas
app.use("/players", playerRoutes);

// Configurar Swagger
swaggerDocs(app);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
