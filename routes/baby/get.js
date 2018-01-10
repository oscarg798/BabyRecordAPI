const Joi = require("joi");
const babyLib = require('../../libs/baby')


module.exports = [{
    method: "GET",
    path: "/baby/{parentUuid}",
    config: {
        tags: ['api'],
        notes: [],
        validate: {
            params: {
                parentUuid: Joi.string().required()
            }
        },
        handler: babyLib.getByParentUuid
    }
},
{
    method: "GET",
    path: "/baby",
    config: {
        tags: ['api'],
        notes: [],
        handler: babyLib.get
    }
}];