"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
// Modelo de Jugador (en MongoDB)
const playerSchema = new mongoose_1.default.Schema({
    name: String,
    team: String,
});
const Player = mongoose_1.default.model('Player', playerSchema);
/**
 * @openapi
 * /players:
 *   get:
 *     description: Obtiene la lista de jugadores
 *     responses:
 *       200:
 *         description: Lista de jugadores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   team:
 *                     type: string
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("GET /players");
    try {
        const players = yield Player.find();
        res.json(players);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener jugadores', error });
    }
}));
/**
 * @openapi
 * /players:
 *   post:
 *     description: Añadir un nuevo jugador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               team:
 *                 type: string
 *     responses:
 *       201:
 *         description: Jugador creado exitosamente
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, team } = req.body;
    const newPlayer = new Player({ name, team });
    try {
        yield newPlayer.save();
        res.status(201).json(newPlayer);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al crear jugador', error });
    }
}));
exports.default = router;
