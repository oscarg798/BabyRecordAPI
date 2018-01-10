const Joi = require('joi');
const recordLib = require('../../libs/record')
module.exports = {
    method: 'PUT',
    path: '/record/{uuid}',
    config: {
        tags: ['api'],
        notes: [],
        validate: {
            params:{
                uuid:Joi.string().required()
            },
            payload: {
                startTime: Joi.number().optional(),
                endTime: Joi.number().optional(),
                type: Joi.string().optional(),
            }
        },
        handler: recordLib.update
    }
};