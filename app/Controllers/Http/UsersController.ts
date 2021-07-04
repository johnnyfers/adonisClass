import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from '../../Validators/UserValidator'

export default class UsersController {
    async store({ request, response }: HttpContextContract) {
        try {
            const data = await request.validate(UserValidator)

            const user = await User.create(data)

            return user
        } catch (err){
            return response.badRequest(err)
        }
    }
}
