const router = require('express').Router();

//router.get('/', (req, rest) => {rest.send('Hello World!')});

router.use('/users', require('./users'));

module.exports = router; 
