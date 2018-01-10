const Joi = require('joi');
const recordLib = require('../../libs/record')
module.exports = [{
    method: 'GET',
    path: '/record',
    config: {
        tags: ['api'],
        notes: [],
        handler: recordLib.get
    }
},
{
    method: 'GET',
    path: '/record/byBaby/{babyUuid}',
    config: {
        tags: ['api'],
        notes: [],
        validate:{
            params:{
                babyUuid:Joi.string().required()
            }
        },
        handler: recordLib.getByBaby
    }
}];