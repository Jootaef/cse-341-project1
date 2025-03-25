const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};


const createUser = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
      const user = {
        email: req.body.email,
        username: req.body.username, 
        name: req.body.name,
        ipaddress: req.body.ipaddress
      };
  
      const result = await mongodb.getDatabase().db().collection('users').insertOne(user);
  
      if (result.acknowledged) {
        res.status(201).json(result);
      } else {
        res.status(500).json({ message: 'Error inserting the user.' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };




const updateUser = async (req, res) => {
    //swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const user =  {
        email: req.body.email,
        username: req.body.userName,
        name:req.body.name,
        ipaddress: req.body.ipaddress
    };
    const result = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
    if (result.modifiedCount > 0 ) {
        res.status(204).send();
    }else {
        res.status(500).json(result.error || 'Some error occurred while updating the user.');
    }

}

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId});
    if (result.deletedCount > 0 ) {
        res.status(204).send();
    }else {
        res.status(500).json(result.error || 'Some error occurred while deleting the user.');
    }

}

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};