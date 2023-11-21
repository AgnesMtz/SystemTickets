import { conectarDB } from "../database/db.js";

// /api/user
// Para mandar todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const connection = await conectarDB();
        const rows = await connection.query(`SELECT * FROM user;`);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// /api/user/:id
// Para mandar un usuario en especifico
export const getUser = async (req, res) => {
    try {
        const connection = await conectarDB();
        const [user] = await connection.query(`SELECT * FROM user WHERE id = ${req.params.id}`);
        const [worker] = await connection.query(`SELECT * FROM worker WHERE userId = ${req.params.id}`);
        const [position] = await connection.query(`SELECT * FROM position WHERE id = ${worker.position}`);

        // console.log(worker)
        // Toda la informacion que se va a mandar
        const data2Send = {
            id: user.id,
            email: user.email,
            gender: worker.gender,
            name: worker.name,
            firstLastName: worker.firstLastName,
            secondLastName: worker.secondLastName,
            phone: worker.phone,
            position: position.name,
            active: worker.active,
            dateJoined: worker.dateJoined,
            birthDate: worker.birthDate,
            emerPhone: worker.emerPhone,
        };
        // console.log(data2Send);
        res.json([data2Send]);
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    //Falta hacer esta funcion
};

// /api/user/:id PUT
// Funcion que actualiza datos en tabla user y worker
export const updateUser = async (req, res) => {
    try {
        const connection = await conectarDB();
        var user, worker;

        const updateUser = {
            email: req.body.email,
            updatedAt: new Date(),
            verified: req.body.verified,
        };
        // console.log(updateUser);
        Object.keys(updateUser).forEach((key) => updateUser[key] === undefined && delete updateUser[key]);
        // console.log(updateUser);
        if (Object.keys(updateUser).length !== 1) {
            user = await connection.query(`UPDATE user SET ? WHERE id = ${req.params.id}`, [updateUser]);
        } else {
            user = { affectedRows: 0 };
        }
        // console.log(user);

        const updateWorker = {
            position: req.body.position,
            active: req.body.active,
            emerPhone: req.body.emerPhone,
            birthDate: req.body.birthDate,
            name: req.body.name,
            firstLastName: req.body.firstLastName,
            secondLastName: req.body.secondLastName,
            phone: req.body.phone,
            gender: req.body.gender,
        };
        Object.keys(updateWorker).forEach((key) => updateWorker[key] === undefined && delete updateWorker[key]);
        if (Object.keys(updateWorker).length !== 0) {
            worker = await connection.query(`UPDATE worker SET ? WHERE userId = ${req.params.id}`, [updateWorker]);
        } else {
            worker = { affectedRows: 0 };
        }
         console.log(worker);

        res.json([user, worker]);
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const editarUsuario = async (req,res) =>{


    //////Se esta trabakjando ene sto

    
    ////////////
    try {
        /////// 1era version
        const { name, firstLastName, secondLastName, email,  phone, dateJoined, birthDate, emerPhone } = req.body;

        //Se crea la conexion a la base de datos
        const connection = await conectarDB();
        // Obtenemos los datos del trabajador
        var userInfo = await connection.query(`SELECT * FROM user WHERE email = ${email}`);
        console.log(userInfo);
        var userId = userInfo[0].id;


        // Actualizamos los datos del trabajador
        var response = await connection.query(`UPDATE worker SET worker.name = "${name}", worker.firstLastName = "${firstLastName}", worker.secondLastName = "${secondLastName}",
        worker.phone = "${phone}", worker.dateJoined = "${dateJoined}", worker.birthDate = "${birthDate}", worker.emerPhone = "${emerPhone}", user.email = "${email}", WHERE worker.id = "${userId}"`);

        // Retornamos los datos del trabajador actualizados
        const trabajador = await connection.query(`SELECT client.id,client.companyName, user.email, client.active,client.priority, worker.name, worker.firstLastName, worker.secondLastName, subscription.name AS susbcription FROM client INNER JOIN worker INNER JOIN subscription INNER JOIN user ON client.workerInCharge = worker.id AND client.subscription = subscription.id AND client.userId = user.id WHERE client.userId = '${clientUserId}' ORDER BY id`)
        const trabajadorInfo = await connection.query(`SELECT * FROM worker WHERE id = ${userId}`);
        trabajador[0].trabajadorInfo = trabajadorInfo
        res.json(trabajador);

        ///////

//         ///////////// 2da
// //        const connection = await conectarDB();
//         var user, worker;
//         const [existeUsuario] = await connection.query(`SELECT COUNT(*) as usuario FROM user WHERE email = '${email}';`)

//         if (existeUsuario.usuario != 0) {

//             const error = new Error('¡Usuario ya encontrado!')
//             return res.status(400).json({ msg: error.message })

//         }
//         const updateUser = {
//             email: req.body.email,
//             updatedAt: new Date(),
//             verified: req.body.verified,
//         };
//          console.log(updateUser);
//         Object.keys(updateUser).forEach((key) => updateUser[key] === undefined && delete updateUser[key]);
//          console.log(updateUser);
//         if (Object.keys(updateUser).length !== 1) {
//             user = await connection.query(`UPDATE user SET ? WHERE id = ${req.params.id}`, [updateUser]);
//         } else {
//             user = { affectedRows: 0 };
//         }
//          console.log(user);  
//         const updateWorker = {
//             position: req.body.position,
//             emerPhone: req.body.emerPhone,
//             birthDate: req.body.birthDate,
//             name: req.body.name,
//             firstLastName: req.body.firstLastName,
//             secondLastName: req.body.secondLastName,
//             phone: req.body.phone,
//             gender: req.body.gender,
//         };
//         Object.keys(updateWorker).forEach((key) => updateWorker[key] === undefined && delete updateWorker[key]);
//         if (Object.keys(updateWorker).length !== 0) {
//             worker = await connection.query(`UPDATE worker SET ? WHERE userId = ${req.params.id}`, [updateWorker]);
//         } else {
//             worker = { affectedRows: 0 };
//         }
//          console.log(worker);

//         res.json([user, worker]);

        /////////////////
    } catch (error) {
         console.log(error);
        return res.status(500).json({ message: error.message });
    }

}

export const deleteUser = async (req, res) => {
    //Falta hacer esta funcion
};
