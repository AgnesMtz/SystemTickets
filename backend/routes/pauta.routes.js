import express from "express";
import {
    crearPauta,
    crearPautaExcel,
    mostrarDatos,
    editarTask,
    editarPauta,
    mostrarPautas,
    autorizarPauta,
    mostrarTask,
    borrarPauta,
    borrarTask
} from "../controllers/pauta.controller.js"
import { 
    crearTicket,
    asignarTicket,
    cambiarAsignacionTicket,
    mostrarTodosTickets,
    mostrarMisTickets, 
    ticketPrueba,
    mostrarDatosTicket,
    mostrarMisTicketsCliente,
    mostrarTicket,
    obtenerTicket,
    subirTicket,
    cambiarEstado,
    subirComentarios,
    cambiarEstadoAprobado,
    cambiarEstadoCancelado,
    mostrarTicketsPorEncargado,
    cambiarEstadoPropuesta,
    cambiarEstadoInformacion,
    cambiarEstadoPausaPorCliente,
    cambiarEstadoCanceloCliente,
    cambiarEstadoPausaPorGS,
    cambiarEstadoCorrecciones,
    cambiarEstadoTerminado,
    cambiarEstadoCanceladoPorPago,
    cambiarEstadoRevisionPorDiseno,
} from "../controllers/ticket.controller.js"

import {
    upload
} from "../controllers/archivos.js"

const router = express.Router()

// Funciones Diego
router.post('/crear-pauta/', crearPauta)
router.post('/crear-pautaEx/:id', upload.single('pauta') , crearPautaExcel)
router.get('/crear-pauta/', mostrarDatos)
router.get('/mostrar-pauta/:id', mostrarPautas)
router.get('/mostrar-task/:id', mostrarTask)
router.put('/mostrar-pauta/:taskId', editarTask)
router.put('/editar-pauta/:pautaId', editarPauta)
router.put('/borrar-task/:taskId', borrarTask)
router.put('/borrar-pauta/:pautaId', borrarPauta)
// Aun de Diego pero sobre tickets
router.get('/mostrar-tickets/', mostrarTodosTickets)
router.get('/mostrar-tickets/:workerId', mostrarMisTickets)
router.get('/mostrar-ticketsCliente/:clientId', mostrarMisTicketsCliente)
router.get('/mostrar-tickets-encargado/:workerId', mostrarTicketsPorEncargado)
router.get('/mostrar-ticket/:ticketId', mostrarTicket)
router.get('/prueba-ticket/', ticketPrueba)
router.put('/subir-ticket/:ticketId', upload.single('ticket') , subirTicket)
router.put('/editar-estado/:ticketId', cambiarEstado)
router.put('/editar-estadoAprobado/:ticketId', cambiarEstadoAprobado)
router.put('/editar-estadoCancelado/:ticketId', cambiarEstadoCancelado)
router.put('/editar-estadoPropuesta/:ticketId', cambiarEstadoPropuesta)
router.put('/editar-estadoRevisionPorDiseno/:ticketId', cambiarEstadoRevisionPorDiseno)
router.put('/editar-estadoInformacion/:ticketId', cambiarEstadoInformacion)

router.put('/subir-comentarios/:ticketId', subirComentarios)
router.put('/editar-estadoPausaPorCliente/:ticketId', cambiarEstadoPausaPorCliente)
router.put('/editar-estadoCanceloCliente/:ticketId', cambiarEstadoCanceloCliente)
router.put('/editar-estadoPausaPorGS/:ticketId', cambiarEstadoPausaPorGS)
router.put('/editar-estadoCorrecciones/:ticketId', cambiarEstadoCorrecciones)
router.put('/editar-estadoTerminado/:ticketId', cambiarEstadoTerminado)
router.put('/editar-estadoCanceladoPorPago/:ticketId', cambiarEstadoCanceladoPorPago)

// Funciones Arturo
router.put('/autorizar-pauta/', autorizarPauta)
router.get('/crear-ticket/', mostrarDatosTicket)

router.post('/crear-ticket/', crearTicket)
router.get('/obtener-ticket/:ticketId', obtenerTicket)

router.post('/asignar-ticket/', asignarTicket)
router.put('/cambiar-asignacion-ticket/', cambiarAsignacionTicket)

export default router