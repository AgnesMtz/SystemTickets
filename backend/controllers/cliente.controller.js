import { conectarDB } from "../database/db.js";

export const verCliente = async (req, res) => {
    try {
        //Se obtiene el id del cliente
        const { id } = req.params;

        //Se crea la conexion a la base de datos
        const connection = await conectarDB();

        //Se ejecuta la consulta para obtener los datos del cliente
        const response1 = await connection.query("SELECT * FROM Client WHERE id = ?", [id]);

        if (response1.length === 0) {
            res.status(400).json({ msg: "Error #454: El cliente no existe." });
        } else {
            const client = response1[0];

            const response2 = await connection.query("SELECT * FROM BranchOffice WHERE clientId = ?", [id]);
            client.branchOffices = response2;

            const response3 = await connection.query("SELECT * FROM Contact WHERE clientId = ?", [id]);
            client.contacts = response3;
            res.json(client);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error #460: Algo salio mal al obtener los clientes." });
    }
};

export const crearContacto = async (req, res) => {
    try {
        //Se obtiene el id del cliente
        const { clientId } = req.body;


        //Se crea la conexion a la base de datos
        const connection = await conectarDB();

        //Se ejecuta la consulta para obtener los datos del cliente
        const response1 = await connection.query("SELECT * FROM Client WHERE id = ?", [clientId]);
        console.log(response1);

        if (response1.length === 0) {
            res.status(400).json({ msg: "Error #454: El cliente no existe." });
        } else {
            const { name, firstLastName, secondLastName, birthDate } = req.body;

            const response2 = await connection.query(
                "INSERT INTO Contact (name, firstLastName, secondLastName, birthDate, clientId, active) VALUES (?, ?, ?, ?, ?, 1)",
                [name, firstLastName, secondLastName, birthDate, clientId]
            );

            res.json({ msg: "Contacto creado exitosamente." });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error #460: Algo salio mal al obtener los clientes." });
    };
};


    export const editarCliente = async (req,res) =>{
        try {
        // Obtenemos la información del cliente
        const { clienteId ,companyName, email, priority, encargado} = req.body;

        //Se crea la conexion a la base de datos
        const connection = await conectarDB();
        // Obtenemos los datos del cliente
        var clientInfo = await connection.query(`SELECT * FROM client WHERE id = ${clienteId}`);
        var clientUserId = clientInfo[0].userId;
        // Actualizamos los datos del cliente
        var response = await connection.query(`UPDATE client SET client.companyName = "${companyName}", client.priority = "${priority}" , client.workerInCharge = "${encargado}" WHERE client.id = "${clienteId}"`);
        // Acutalizamos el correo del user
        var responseEmail = await connection.query(`UPDATE user SET user.email = "${email} "WHERE user.id = "${clientUserId}"`);

        // Retornamos los datos del cliente actualizados
        const cliente = await connection.query(`SELECT client.id,client.companyName, user.email, client.active,client.priority, worker.name, worker.firstLastName, worker.secondLastName, subscription.name AS susbcription FROM client INNER JOIN worker INNER JOIN subscription INNER JOIN user ON client.workerInCharge = worker.id AND client.subscription = subscription.id AND client.userId = user.id WHERE client.userId = '${clientUserId}' ORDER BY id`)
        const encargadoInfo = await connection.query(`SELECT * FROM worker WHERE id = ${encargado}`);
        cliente[0].encargadoInfo = encargadoInfo
        res.json(cliente);

            
        } catch (error) {
            return res.status(400).json({ msg: error.message });
            
        }

    }

    export const ticketsEnProceso = async (req, res) => {
        try {
            const {id} = req.params;
            
            const connection = await conectarDB();
            const ticketsPorCliente =
                await connection.query(`SELECT * FROM ticket where clientId = "${id}" and state in (2,3,4,6,8,9,13)`);

            res.json(ticketsPorCliente);
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }
    };
    