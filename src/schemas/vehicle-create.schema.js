const joi = require('joi');
const {VehicleType} = require('../models/vehicle-type.enum');

const vehicleCreateSchema = joi.object({
    name: joi.string().required(),
    type: joi.string().valid(VehicleType.SUV, VehicleType.Hybrid, VehicleType.Truck).required(),

    id: joi.allow(),
    created: joi.allow(),
    lastSuccessfulConnection: joi.allow(),
    location: joi.allow()
});

exports.vehicleCreateSchema = vehicleCreateSchema;
