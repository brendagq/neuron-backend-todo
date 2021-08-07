
const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')
const User = require('../models/UserModel')
const Task = require('../models/TaskModel')

async function createNewUser({ name, email, password }) {

    const userFound = await User.findOne({ email })
    if ( userFound ) throw new Error('El email ingresado ya se encuentra registrado')

    const hashedPassword = await bcrypt.hashPassword( password )

    return new User({
        name, 
        email,
        password : hashedPassword, 
    })  

}

async function loginUser({ email, password }) {

    const userFound = await User.findOne({ email })
    if ( !userFound ) throw new Error('El email ingresado no existe')

    const validPassword = await bcrypt.compare( password, userFound.password )
    if ( !validPassword ) throw new Error('Contraseña incorrecta')

    return  {
        token: jwt.generateToken({ id: userFound._id }),
        id: userFound._id
    }

}

async function getUserDetail( id ) {

    const userFound = await User.findOne({ _id: id }, { password: 0 }).populate('tasks', { userId: 0})
    
    if( !userFound ) throw new Error('El usuario no fue encontrado')

    const orderTasks = await Task.aggregate([
        {
            $match:{
                userId : id
            }
        },
        {
            $group:{
                _id : "$status",
                tasks: {
                    $push:{
                        title : "$title",
                        description : "$description",
                        dateStart : "$dateStart",
                        dateEnd : "$dateEnd",
                        status : "$status"
                    }
                }
            }
        }
    ])


    return  { userFound, orderTasks }

}

module.exports = {
    createNewUser,
    loginUser,
    getUserDetail
}
