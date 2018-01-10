var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const record = new Schema({
    uuid: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    startTime: {
        type: Number,
        required: true,
        
    },
    endTime: {
        type: Number
    },
    type: {
        type: String,
        required: true,
    },
    babyUuid:{
        type: String,
        required: true,
    }
});

record.methods.toJSON = function () {
    var obj = this.toObject()
    delete obj._id
    delete obj.__v
    return obj
}




mongoose.model('Record', record);

