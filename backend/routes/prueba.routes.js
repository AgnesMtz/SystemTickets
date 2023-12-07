import express from "express";
import {
    obtenerNumero
} from "../controllers/prueba.js"

const router = express.Router()

// router.get('/obtener-ticketsTerminados/', obtenerTicketsTerminadosHoy)

router.get('/obtener-numero/', obtenerNumero)



export default router