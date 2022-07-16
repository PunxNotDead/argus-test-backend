const express = require('express');
const router = express.Router();

const vehicle = require('../controllers/vehicle.controller');

router.get('/list', vehicle.list);
router.get('/item/:id', vehicle.get);
router.post('/create', vehicle.create);
router.delete('/item/:id', vehicle.delete);
router.put('/item/:id', vehicle.update);

module.exports = router;
