const Joi = require('joi');
const babyLib = require('../../libs/baby')
module.exports = [{
    method: 'PUT',
    path: '/baby/addParent/{uuid}',
    config: {
        tags: ['api'],
        notes: [],
        validate: {
            params: {
                uuid: Joi.string().required()

            },
            query: {
                parent: Joi.string().required()

            }
        },
        handler: babyLib.addParent
    }
}, {
    method: 'PUT',
    path: '/baby/{uuid}',
    config: {
        tags: ['api'],
        notes: [],
        validate: {
            params: {
                uuid: Joi.string().required()

            },
            payload: {
                name: Joi.string().optional(),
                birthDate: Joi.string().optional(),
                parents: Joi.array().items(Joi.string()).optional()

            }
        },
        handler: babyLib.update
    }
}];