const playerService = require("../services/playerService");

const getPlayers = async (req, res) => {
    try {
        const players = await playerService.getAllPlayers();
        res.json(players);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addPlayer = async (req, res) => {
    try {
        const newPlayer = await playerService.createPlayer(req.body);
        res.status(201).json(newPlayer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updatePlayer = async (req, res) => {
    try {
        const updatedPlayer = await playerService.updatePlayer(req.params.id, req.body);
        if (!updatedPlayer) return res.status(404).json({ error: "Jugador no encontrado" });
        res.json(updatedPlayer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { getPlayers, addPlayer, updatePlayer };
