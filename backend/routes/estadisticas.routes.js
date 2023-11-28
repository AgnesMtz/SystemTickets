import express from "express";
import {
    obtenerTicketsTerminadosHoy
} from "../controllers/estadisticas.js"

const router = express.Router()

router.get('/obtener-ticketsTerminados/', obtenerTicketsTerminadosHoy)



export default router