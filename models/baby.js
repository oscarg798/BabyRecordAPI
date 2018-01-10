
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const baby = new Schema({
    uuid: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    name: {
        type: String,
        required: true,

    },
    birthDate: {
        type: Number,
        required: true,
    },
    parents:{
        type:[String],
        required:true
    }
});

baby.methods.toJSON = function () {
    var obj = this.toObject()
    delete obj._id
    delete obj.__v
    return obj
}



mongoose.model('Baby', baby);

