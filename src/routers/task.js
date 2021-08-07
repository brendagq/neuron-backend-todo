const router = require('express').Router()
const authRoute = require('../middlewares/authRoute')
const task = require('../usecases/task')


//Rutas privadas

router.post('/create/:id', authRoute, async (request,response) =>{

    try {

        const newTask = await task.createNewTask( request.body, request.params.id)

        await newTask.save()

        response.json({
            status: 200,
            success: true,
            message: 'La tarea fue agregada exitosamente',
            data: {
                task: newTask
            }
        })        
    } catch (error) {
        response.json({
            status: 400,
            success: false,
            message: error.message,
            data: {
                error: error.message
            }
        })
    }
})


router.patch('/edit/:id', authRoute, async (request,response) =>{
    try {

        const updatedTask = await task.editTask(request.params.id, request.body)

        response.json({
            status: 200,
            success: true,
            message: 'La tarea fue editada exitosamente',
            data: {
                task: updatedTask
            }
        })        
    } catch (error) {
        response.json({
            status: 400,
            success: false,
            message: error.message,
            data: {
                error: error.message
            }
        })
    }
})


router.delete('/delete/:id', authRoute, async (request,response) =>{ 
    try {
        const deletedTask = await task.deleteTask( request.params.id )

        response.json({
            status: 200,
            success: true,
            message: 'La tarea fue eliminada con éxito',
            data: {
                task: deletedTask
            }
        })    
    } catch (error) {
        response.json({
            status: 400,
            success: false,
            message: error.message,
            data: {
                error: error.message
            }
        })
    }
})


module.exports = router