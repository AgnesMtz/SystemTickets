// En tu controlador (por ejemplo, controllers/graphController.js)
import { conectarDB } from "../database/db.js"

const obtenerTicketsTerminadosHoy = async (req, res) => {
  try {
    const connection = await conectarDB();
    const [existeTickets] = await connection.query(
      `SELECT COUNT(*) AS num_tickets FROM ticket WHERE state = 5 AND DATE(applicationDate) = CURDATE();`
    );

    if (existeTickets.usuario === 0) {
      return res.status(404).json({ mensaje: 'No hay tickets terminados hoy' });
    }

    return res.json({ num_tickets: existeTickets.num_tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};


const obtenerTicketsTerminadosAyer = async (req, res) => {

  try {
    console.log("Llegeu a la ruta");
    const connection = await conectarDB();
    const [existeTickets2] = await connection.query(
      `SELECT COUNT(*) AS num_tickets
      FROM ticket
      WHERE state = 5 AND DATE(applicationDate) = DATE_SUB(CURDATE(), INTERVAL 1 DAY);
      `
    );

    if (existeTickets2.usuario === 0) {
      return res.status(404).json({ mensaje: 'No hay tickets terminados ' });
    }
    console.log(existeTickets2)
    return res.json({ num_tickets: existeTickets2.num_tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const obtenerTicketsTerminadosAntier = async (req, res) => {
  try {
    const connection = await conectarDB();
    const [existeTickets] = await connection.query(
      `SELECT COUNT(*) AS num_tickets
      FROM ticket
      WHERE state = 5 AND DATE(applicationDate) = DATE_SUB(CURDATE(), INTERVAL 2 DAY); `
    );

    if (existeTickets.usuario === 0) {
      return res.status(404).json({ mensaje: 'No hay tickets terminados ' });
    }

    return res.json({ num_tickets: existeTickets.num_tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const obtenerTicketsAsignadosHoy = async (req, res) => {
  try {
    const connection = await conectarDB();
    const [existeTickets] = await connection.query(
      `SELECT COUNT(*) AS num_tickets
      FROM ticket
      WHERE state = 9 AND DATE(applicationDate) = CURDATE(); `
    );

    if (existeTickets.usuario === 0) {
      return res.status(404).json({ mensaje: 'No hay tickets asignado ' });
    }

    return res.json({ num_tickets: existeTickets.num_tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const obtenerTicketsAsignadosAyer = async (req, res) => {
  try {
    const connection = await conectarDB();
    const [existeTickets] = await connection.query(
      `SELECT COUNT(*) AS num_tickets
      FROM ticket
      WHERE state = 9 AND DATE(applicationDate) = DATE_SUB(CURDATE(), INTERVAL 1 DAY); `
    );

    if (existeTickets.usuario === 0) {
      return res.status(404).json({ mensaje: 'No hay tickets asignado ' });
    }

    return res.json({ num_tickets: existeTickets.num_tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const obtenerTicketsAsignadosAntier = async (req, res) => {
  try {
    const connection = await conectarDB();
    const [existeTickets] = await connection.query(
      `SELECT COUNT(*) AS num_tickets
      FROM ticket
      WHERE state = 9 AND DATE(applicationDate) = DATE_SUB(CURDATE(), INTERVAL 2 DAY); `
    );

    if (existeTickets.usuario === 0) {
      return res.status(404).json({ mensaje: 'No hay tickets asignado ' });
    }

    return res.json({ num_tickets: existeTickets.num_tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const obtenerTicketsAsignados = async (req, res) => {
  try {
    const connection = await conectarDB();
    const [existeTickets] = await connection.query(
      `SELECT COUNT(*) AS num_tickets
      FROM ticket
      WHERE state = 9  `
    );

    if (existeTickets.usuario === 0) {
      return res.status(404).json({ mensaje: 'No hay tickets asignado ' });
    }

    return res.json({ num_tickets: existeTickets.num_tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const obtenerTicketsTerminados = async (req, res) => {
  try {
    const connection = await conectarDB();
    const [existeTickets] = await connection.query(
      `SELECT COUNT(*) AS num_tickets
      FROM ticket
      WHERE state = 5  `
    );
    console.log("Terminados",existeTickets);

    if (existeTickets.usuario === 0) {
      return res.status(404).json({ mensaje: 'No hay tickets asignado ' });
    }
    
    return res.json({ num_tickets: existeTickets.num_tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const obtenerTicketsCanceladosGS = async (req, res) => {
  try {
    const connection = await conectarDB();
    const [existeTickets] = await connection.query(
      `SELECT COUNT(*) AS num_tickets
      FROM ticket
      WHERE state = 10  `
    );

    if (existeTickets.usuario === 0) {
      return res.status(404).json({ mensaje: 'No hay tickets asignado ' });
    }
    
    return res.json({ num_tickets: existeTickets.num_tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

export {
  obtenerTicketsTerminadosHoy,
  obtenerTicketsTerminadosAyer,
  obtenerTicketsTerminadosAntier,
  obtenerTicketsAsignadosHoy,
  obtenerTicketsAsignadosAyer,
  obtenerTicketsAsignadosAntier,
  obtenerTicketsAsignados,
  obtenerTicketsTerminados,
  obtenerTicketsCanceladosGS,
}