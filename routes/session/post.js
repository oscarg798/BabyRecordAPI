const sessionLibrary = require('../../libs/session')
const Joi = require("joi");

const auth = {
  mode: 'try',
  strategy: 'token'
}

const sessionPosts =[ {
    method: "POST",
    path: "/session",
    config: {
        tags: ['api'],
        notes: [],
        validate: {
            payload: {
                email: Joi.string().required(),
                password: Joi.string().required(),
            }
        },
        handler: sessionLibrary.logIn,
        auth
    }
}];


sessionPosts.push({method: 'POST',
    path: '/session/validate',
    config: {
      tags: ['api'],
      validate: {
        payload: {
          token: Joi.string().required()
        }
      },
      handler: sessionLibrary.validate,
      auth
    }
  });

  module.exports = sessionPosts;