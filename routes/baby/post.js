const Joi = require('joi');
const babyLib = require('../../libs/baby')
module.exports = {
    method: 'POST',
    path: '/baby',
    config: {
        tags: ['api'],
        notes: [],
        validate: {
            payload: {
                name: Joi.string().required(),
                birthDate:Joi.string().required(),
                parents:Joi.array().items(Joi.string()).required()

            }
        },
        handler: babyLib.create
    }
};