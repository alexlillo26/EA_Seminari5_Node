const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true }
});

module.exports = mongoose.model("Player", playerSchema);
