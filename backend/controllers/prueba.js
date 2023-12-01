// En tu controlador (por ejemplo, controllers/graphController.js)
import { conectarDB } from "../database/db.js"

const obtenerNumero = async (req, res) => {
  try {
    // const connection = await conectarDB();
    // const [existeTickets] = await connection.query(
    //   `SELECT COUNT(*) AS num_tickets FROM ticket WHERE state = 5 AND DATE(applicationDate) = CURDATE();`
    // );

    // if (existeTickets.usuario === 0) {
    //   return res.status(404).json({ mensaje: 'No hay tickets terminados hoy' });
    // }

    return res.json({ num: 1000 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};


export {
    obtenerNumero
}