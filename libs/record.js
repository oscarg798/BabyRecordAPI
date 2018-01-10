
const uuid = require('node-uuid');
const mongoose = require('mongoose');

let recordLib = {
    create: create,
    get: get,
    getByBaby: getByBaby,
    update: update,
    del:del
}

module.exports = recordLib


async function create(request, response) {
    try {

        let baby = await mongoose.model('Baby').findOne({ uuid: request.payload.babyUuid })
        if (baby) {
            let record = mongoose.model('Record')({
                uuid: uuid.v4(),
                startTime: request.payload.startTime,
                endTime: request.payload.endTime,
                type: request.payload.type,
                babyUuid: request.payload.babyUuid
            });
            let recordSaved = await record.save()
            response(recordSaved)
        } else {
            throw { error: 'no baby found', code: 400 }
        }

    } catch (e) {
        response(e).code(e.code || 500)
    }
}



async function get(request, response) {
    try {
        const records = await mongoose.model('Record').find()
        response(records)
    } catch (e) {
        response(e).code(e.code || 500)
    }
}

async function getByBaby(request, response) {
    try {
        const records = await mongoose.model('Record').find({ babyUuid: request.params.babyUuid })
        response(records)
    } catch (e) {
        response(e).code(e.code || 500)
    }
}

async function update(request, response) {
    try {
        var record = await mongoose.model('Record').findOne({ uuid: request.params.uuid })
        if (record) {
            record.startTime = request.payload.startTime || record.startTime
            record.endTime = request.payload.endTime || record.endTime
            record.type = request.payload.type || record.type

            let recordSaved = record.save()
            response(recordSaved)
        } else {
            throw { error: 'no record found', code: 400 }
        }


    } catch (e) {
        response(e).code(e.code || 500)
    }
}

async function del(request, response){
    try {
        var record = await mongoose.model('Record').findOne({ uuid: request.params.uuid })
        if (record) {
            record.remove()
            response(record)
        } else {
            throw { error: 'no record found', code: 400 }
        }


    } catch (e) {
        response(e).code(e.code || 500)
    }
}