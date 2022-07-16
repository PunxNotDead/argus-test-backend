const joi = require('joi');
const {VehicleType} = require('../models/vehicle-type.enum');
const {pointSchema} = require('./point.schema');

const vehicleSchema = joi.object({
    id: joi.string().uuid().required(),
    name: joi.string().required(),
    created: joi.date().timestamp('unix').required(),
    type: joi.string().allow([VehicleType.SUV, VehicleType.Hybrid, VehicleType.Truck]).required(),
    lastSuccessfulConnection: joi.date().required(),
    location: pointSchema
});

exports.vehicleSchema = vehicleSchema;
