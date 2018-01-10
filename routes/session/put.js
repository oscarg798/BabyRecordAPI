
const sessionLibrary = require('../../libs/session')
const Joi = require("joi");
const auth = {
    mode: 'required',
    strategy: 'token'
};

module.exports = [{
    method: "PUT",
    path: "/session/{userUuid}",
    config: {
        tags: ['api'],
        notes: [],
        validate: {
            params: {
                userUuid: Joi.string().required()
            },
            payload: {
                name: Joi.string().required(),
                userType:Joi.string().optional()
            }
        },
        handler: sessionLibrary.update,
        auth
    }
}, {
    method: "PUT",
    path: "/session/changePassword/{email}",
    config: {
        tags: ['api'],
        notes: [],
        validate: {
            params: {
                email: Joi.string().required()
            },
            payload: {
                password: Joi.string().required(),
                newPassword:Joi.string().optional()
            }
        },
        handler: sessionLibrary.updatePassword,
        auth
    }
}];