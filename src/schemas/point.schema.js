const joi = require('joi');

const pointSchema = joi.object({
    long: joi.number().min(-180).max(180).required(),
    lat: joi.number().min(-90).max(90).required()
});

exports.vehicleSchema = pointSchema;
