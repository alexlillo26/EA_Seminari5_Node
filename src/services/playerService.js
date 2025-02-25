const Player = require("../models/Player");

// Obtener todos los jugadores
const getAllPlayers = async () => {
    return await Player.find();
};

// Crear un jugador
const createPlayer = async (data) => {
    const newPlayer = new Player(data);
    return await newPlayer.save();
};

// Actualizar un jugador
const updatePlayer = async (id, data) => {
    return await Player.findByIdAndUpdate(id, data, { new: true });
};

module.exports = { getAllPlayers, createPlayer, updatePlayer };
