const mongodb = require('../data/database.js'); // ✅ Ruta corregida
const ObjectId = require('mongodb').ObjectId;  // ✅ Corregido el nombre de ObjectId

// Obtener todos los usuarios
const getall = async (req, res) => {
    try {
        const result = await mongodb.getdatabase().collection('users').find().toArray(); // ✅ Corrección de await y uso correcto de toArray()
        res.setHeader('Content-Type', 'application/json'); // ✅ Corrección de setHeader
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo usuarios', error });
    }
};

// Obtener un solo usuario por ID
const getsingle = async (req, res) => {
    try {
        const userid = new ObjectId(req.params.id); // ✅ Corregido el uso de ObjectId
        const result = await mongodb.getdatabase().collection('users').findOne({ _id: userid }); // ✅ Usar findOne en lugar de find

        if (!result) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.setHeader('Content-Type', 'application/json'); // ✅ Corrección de setHeader
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo usuario', error });
    }
};

module.exports = {
    getall,
    getsingle
};
