const Joi = require('joi');
const recordLib = require('../../libs/record')
module.exports = {
    method: 'POST',
    path: '/record',
    config: {
        tags: ['api'],
        notes: [],
        validate: {
            payload: {
                startTime: Joi.number().required(),
                endTime: Joi.number().optional(),
                type: Joi.string().required(),
                babyUuid: Joi.string().required()


            }
        },
        handler: recordLib.create
    }
};