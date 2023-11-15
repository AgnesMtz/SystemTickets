import express from "express";
import { verCliente, crearContacto, editarCliente, ticketsEnProceso } from "../controllers/cliente.controller.js";

const router = express.Router();

router.get("/:id", verCliente);
router.post("/crear-contacto", crearContacto);
router.put("/editar-informacion-cliente", editarCliente);
router.get("/tickets-en-proceso/:id", ticketsEnProceso);

export default router;
