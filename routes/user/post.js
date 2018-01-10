const Joi = require('joi');
const userLib = require('../../libs/user')
module.exports = {
    method: 'POST',
    path: '/user',
    config: {
        tags: ['api'],
        notes: [],
        validate: {
            payload: {
                email: Joi.string().required(),
                password:Joi.string().required(),
                name:Joi.string().required()

            }
        },
        handler: userLib.create
    }
};