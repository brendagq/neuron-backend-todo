
const router = require('express').Router()
const user = require('../usecases/user')
const authRoute = require('../middlewares/authRoute')


//Public Routes

router.post('/register', async ( request, response ) =>{
    try {
        const newUser = await user.createNewUser( request.body )
        await newUser.save()

        response.json({
            status: 200,
            success: true,
            message: "Usuario registrado exitosamente",
            data:{
                user: newUser
            }
        })     
    } catch (error) {
        response.json({
            status: 400,
            success: false,
            message: 'El registro no pudo completarse',
            data: {
                error: error.message
            }
        })
    }
})

router.post('/login', async ( request,response ) =>{
    try {
        const data = await user.loginUser( request.body )

        response.header('token', data.token)
        response.json({
            status: 200,
            success: true,
            message: "Inicio de sesión exitoso",
            data:{
                data
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



//Private Routes

router.get('/:id', authRoute, async (request,response) =>{
    try {
        const userData = await user.getUserDetail( request.params.id )

        response.json({
            status: 200,
            success: true,
            message: 'Detalle del usuario',
            data: {
                user: userData.userFound,
                orderTasks: userData.orderTasks
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
