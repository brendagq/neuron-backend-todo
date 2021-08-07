
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Task = require('./TaskModel')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es un campo requerido'],
        minlength: 3
    },
    email: {
        type: String,
        required: [true, 'El email es un campo requerido'],
        validate: {
            validator: function(v) {
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(v);
            },
            message: props => `${props.value} no es un email valido`
        },
    },
    password: {
        type: String,
        required: [true, 'La contraseña es un campo requerido']
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', UserSchema)
