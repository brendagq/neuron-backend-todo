
const Task = require('../models/TaskModel')
const User = require('../models/UserModel')

async function createNewTask({ title, description, dateStart, dateEnd, status }, id) {

    const userFound = await User.findById(id)
    if ( !userFound ) throw new Error('El usuario no existe')

    const newTask = new Task({
                        title,
                        description,
                        dateStart,
                        dateEnd,
                        status,
                        userId : id
                    }) 

    userFound.tasks = userFound.tasks.concat(newTask)
    await userFound.save()

    return newTask

}

async function editTask( id, data ) {

    const task = await Task.findById( id )
    if( !task ) throw new Error('La tarea no fue encontrada')

    return Task.findByIdAndUpdate(id, data)

}

async function deleteTask( id ) {

    const deletedTask = await Task.findOneAndDelete({ _id: id })
    if( !deletedTask ) throw new Error('La tarea no fue encontrada')

    return  deleteTask

}

async function getTaskDetail( id ) {

    const taskFound = await Task.findOne()
    
    if( !taskFound ) throw new Error('La tarea no existe')

    return  taskFound 

}



module.exports = {
    createNewTask,
    editTask,
    deleteTask,
    getTaskDetail
}
