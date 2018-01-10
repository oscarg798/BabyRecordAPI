const uuid = require('node-uuid');
const mongoose = require('mongoose');

const babyLib = {
    create: create,
    get: get,
    getByParentUuid: getByParentUuid,
    addParent: addParent,
    update: update
}

module.exports = babyLib


async function create(request, response) {
    try {
        let baby = mongoose.model('Baby')({
            uuid: uuid.v4(),
            name: request.payload.name,
            birthDate: request.payload.birthDate,
            parents: request.payload.parents
        });


        const babySaved = await baby.save()
        response(babySaved)
    } catch (e) {
        response(e)
    }
}

async function get(request, response) {
    try {
        const babies = await mongoose.model('Baby').find()
        response(babies)
    } catch (e) {
        response(e)
    }
}

async function getByParentUuid(request, response) {
    try {
        const babies = await mongoose.model('Baby').find({ parents: request.params.parentUuid })
        response(babies)
    } catch (e) {
        response(e)
    }
}

async function addParent(request, response) {
    try {
        const baby = await mongoose.model('Baby').findOne({ uuid: request.params.uuid })
        if (baby) {
            baby.parents.push(request.query.parent)
            let savedBaby = await baby.save()
            response(savedBaby)
        } else {
            throw { error: 'no baby found', code:400 }
        }

    } catch (e) {
        response(e).code(e.code || 500)
    }

}

async function update(request, response) {
    try {
        const baby = await mongoose.model('Baby').findOne({ uuid: request.params.uuid })
        if (baby) {
            baby.name = request.payload.name || baby.name
            baby.birthDate = request.payload.birthDate || baby.birthDate
            baby.parents = request.payload.parents || baby.parents
            let savedBaby = await baby.save()
            response(savedBaby)
        } else {
            throw { error: 'no baby found', code:400 }
        }

    } catch (e) {
        response(e).code(e.code || 500)
    }

}