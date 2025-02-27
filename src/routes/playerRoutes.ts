import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Modelo de Jugador (en MongoDB)
const playerSchema = new mongoose.Schema({
  name: String,
  team: String,
});

const Player = mongoose.model('Player', playerSchema);

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
router.get('/', async (req: Request, res: Response) => {
  console.log("GET /players");
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener jugadores', error });
  }
});

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
router.post('/', async (req: Request, res: Response) => {
  const { name, team } = req.body;
  
  const newPlayer = new Player({ name, team });
  
  try {
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear jugador', error });
  }
});

export default router;