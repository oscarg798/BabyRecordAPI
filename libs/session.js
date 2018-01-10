const uuid = require('node-uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Authenticate = require('./authenticate.js');


const sessionLibrary = {
    logIn: create,
    validate: validate,
    update: update,
    updatePassword: updatePassword
}

module.exports = sessionLibrary;

function create(request, response) {
    if (request.auth.isAuthenticated) {
        return response('Already logged in')
    }

    const email = request.payload.email.toLowerCase();

    mongoose.model('User').findOne({
        email: email
    }).then(user => {
        if (!user) {
            return response({ message: 'Wrong user or password', statusCode: 400 }).code(400);

        }
        return user.authenticate(request.payload.password)
            .then(match => {
                if (!match) {
                    return response({ message: 'Wrong user or password', statusCode: 400 }).code(400);
                }
                Authenticate.create(user)
                    .then(token => {
                        return response({
                            uuid: user.uuid,
                            name: user.name,
                            email: user.email,
                            userType: user.userType,
                            token: token
                        });
                    }).catch(err => {
                        return response(err);
                    });

            })
            .catch(err => {
                return response(err);
            });
    }).catch(err => {
        return response(err);
    });


}

function validate(request, response) {
    Authenticate.auth(request.payload.token)
        .then(user => {
            return response(user).code(200)
        })
        .catch(err => {
            console.error(err)
            return response({ message: 'Invalid Token', statusCode: 401 }).code(401);
        })
}

function update(request, response) {
    const name = request.payload.name || '';
    const userType = request.payload.avatar || '';
    mongoose.model('User').findOne({ uuid: request.params.userUuid })
        .then(user => {
            if (!user) {
                return response({ message: 'User not found', statusCode: 400 }).code(400);
            }
            user.name = name !== '' ? name : category.name;
            user.userType = userType !== '' ? userType : user.userType;
            user.save()
                .then(userSaved => {
                    return response(userSaved);
                }).catch(err => {
                    return response(err);
                })

        }).catch(err => {
            return response(err);
        });
}

function updatePassword(request, response) {
    const oldPassword = request.payload.password;
    const newPassword = request.payload.newPassword;
    mongoose.model('User').findOne({ email: request.params.email })
        .then(user => {
            if (!user) {
                return response({ message: 'Wrong user or password', statusCode: 400 }).code(400);
            }

            bcrypt.compare(oldPassword, user.password, function (err, isMatch) {
                if (err) return response(err);
                if (!isMatch) {
                    return response({ message: 'Wrong user or password', statusCode: 400 }).code(400);
                }

                bcrypt.hash(request.payload.newPassword, 512).then(hash => {
                    user.password = hash
                    user.save()
                        .then(userSaved => {
                            return response(userSaved);
                        }).catch(err => {
                            return response(err);
                        })
                }).catch(err => {
                    return response(err);
                })
            });
        }).catch(err => {
            return response(err);
        });

}