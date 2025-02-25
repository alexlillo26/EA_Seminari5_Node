import express, { Request, Response } from 'express';
const router = express.Router();

/**
 * @openapi
 * /players:
 *   get:
 *     description: Obtiene todos los jugadores de la NBA
 *     responses:
 *       200:
 *         description: Lista de jugadores
 */
router.get('/players', (req: Request, res: Response) => {
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
router.get('/players/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Detalles del jugador con ID ${id}` });
});

export default router;
