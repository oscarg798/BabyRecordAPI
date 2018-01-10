
const uuid = require('node-uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userLib = {
    create: create,
    findByUuid: findByUuid,
    get: get
}

module.exports = userLib


async function create(request, response) {

    let hashPassword = await bcrypt.hash(request.payload.password, 512);

    var user = mongoose.model('User')({
        uuid: uuid.v4(),
        name: request.payload.name,
        email: request.payload.email,
        password: hashPassword
    });

    let savedUser = await user.save()

    response(savedUser)

}

async function findByUuid(request, response) {
    try {
        const user = await mongoose.model('User').findOne({ uuid: request.params.uuid })
        response(user)
    } catch (e) {
        reponse(e)
    }


}

async function get(request, response){
    try {
        const users = await mongoose.model('User').find()
        response(users)
    } catch (e) {
        reponse(e)
    }
}