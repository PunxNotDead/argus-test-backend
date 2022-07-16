const crypto = require('crypto');

const {vehicleCreateSchema} = require('../schemas/vehicle-create.schema');
const AppDAO = require('../dao/app-dao');
const VehicleRepository = require('../dao/vehicle.repository');
const path = require('path');

const dao = new AppDAO(path.resolve(__dirname, '../db/vehicles.sqlite3'));
const vehiclesRepo = new VehicleRepository(dao);

vehiclesRepo.createTable();

function list(req, res) {
    vehiclesRepo.getAll()
        .then(vehicles => res.json(vehicles.map(vehicle => ({
            id: vehicle.id,
            name: vehicle.name,
            type: vehicle.type,
            created: vehicle.created,
            lastSuccessfulConnection: vehicle.lastSuccessfulConnection,
            location: {
                long: vehicle.long,
                lat: vehicle.lat
            }
        }))))
        .catch(error => res.status(500).json({error: error.message}));
}

function create(req, res) {
    const validation = vehicleCreateSchema.validate(req.body);

    if (validation.error) {
        res.status(400).json({error: validation.error});
        return;
    }

    const newVehicle = {...req.body};
    const now = new Date();

    newVehicle.id = crypto.randomUUID();
    newVehicle.created = now;
    newVehicle.lastSuccessfulConnection = now.toISOString();

    vehiclesRepo.add(newVehicle)
        .then(() => res.json(newVehicle))
        .catch(error => res.status(500).json({error: error.message}));
}

function get(req, res) {
    vehiclesRepo.getById(req.params.id)
        .then(vehicle => res.json({
            id: vehicle.id,
            name: vehicle.name,
            type: vehicle.type,
            created: vehicle.created,
            lastSuccessfulConnection: vehicle.lastSuccessfulConnection,
            location: {
                long: vehicle.long,
                lat: vehicle.lat
            }
        }))
        .catch(error => res.status(500).json({error: error.message}));
}

function deleteVehicle(req, res) {
    vehiclesRepo.deleteById(req.params.id)
        .then(vehicle => res.json({id: req.params.id}))
        .catch(error => res.status(500).json({error: error.message}));
}

function update(req, res) {
    vehiclesRepo.update(req.body)
        .then(vehicle => res.json(req.body))
        .catch(error => res.status(500).json({error: error.message}));
}

exports.list = list;
exports.create = create;
exports.get = get;
exports.delete = deleteVehicle;
exports.update = update;
