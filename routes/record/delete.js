const Joi = require('joi');
const recordLib = require('../../libs/record')
module.exports = {
    method: 'DELETE',
    path: '/record/{uuid}',
    config: {
        tags: ['api'],
        notes: [],
        validate: {
            params: {
                uuid: Joi.string().required()
            }
        },
        handler: recordLib.del
    }
};