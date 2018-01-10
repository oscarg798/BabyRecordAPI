const Joi = require("joi");
const userLib = require('../../libs/user')


module.exports = [{
    method: "GET",
    path: "/user/{uuid}",
    config: {
        tags: ['api'],
        notes: [],
        validate: {
            params: {
                uuid: Joi.string().required()
            }
        },
        handler: userLib.findByUuid
    }
},
{
    method: "GET",
    path: "/user",
    config: {
        tags: ['api'],
        notes: [],
        handler: userLib.get
    }
}];