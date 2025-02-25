"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * @openapi
 * /players:
 *   get:
 *     description: Obtiene todos los jugadores de la NBA
 *     responses:
 *       200:
 *         description: Lista de jugadores
 */
router.get('/players', (req, res) => {
    res.status(200).json({ message: 'Lista de jugadores' });
});
/**
 * @openapi
 * /players/{id}:
 *   get:
 *     description: Obtiene un jugador por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del jugador
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del jugador
 *       404:
 *         description: Jugador no encontrado
 */
router.get('/players/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Detalles del jugador con ID ${id}` });
});
exports.default = router;
