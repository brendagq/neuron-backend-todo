
const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El titulo es un campo requerido'],
        minlength: 3
    },
    description: {
        type: String,
        required: [true, 'La descripción es un campo requerido'],
        minlength: 3
    },
    dateStart: {
        type: String,
        required: [true, 'La fecha es un campo requerido'],
        minlength: 3
    },
    dateEnd: {
        type: String,
        required: [true, 'La fecha es un campo requerido'],
        minlength: 3
    },
    userId: {
        type: String
    },
    status:{
        type: Number,
        default: 0
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Task', TaskSchema)
