import express from "express";
import {
    obtenerTicketsTerminadosHoy,
  obtenerTicketsTerminadosAyer,
  obtenerTicketsTerminadosAntier,
  obtenerTicketsAsignadosHoy,
  obtenerTicketsAsignadosAyer,
  obtenerTicketsAsignadosAntier,
  obtenerTicketsAsignados,
  obtenerTicketsTerminados,
  obtenerTicketsCanceladosGS
} from "../controllers/estadisticas.js"

const router = express.Router()

router.get('/obtener-ticketsTerminados/', obtenerTicketsTerminadosHoy)
router.get('/obtener-ticketsTerminadosAyer/', obtenerTicketsTerminadosAyer)
router.get('/obtener-ticketsTerminadosAntier/', obtenerTicketsTerminadosAntier)
router.get('/obtener-ticketsAsignadosHoy/', obtenerTicketsAsignadosHoy)
router.get('/obtener-ticketsAsignadosAyer/', obtenerTicketsAsignadosAyer)
router.get('/obtener-ticketsAsignadosAntier/', obtenerTicketsAsignadosAntier)
router.get('/obtener-ticketsAsignados/', obtenerTicketsAsignados)
router.get('/obtener-ticketsTerminadoss/', obtenerTicketsTerminados)
router.get('/obtener-ticketsCanceladosGS/', obtenerTicketsCanceladosGS)

// router.get('/obtener-numero/', 130)



export default router