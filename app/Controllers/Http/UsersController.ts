import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserAddress from 'App/Models/UserAddress'
import UserValidator from '../../Validators/UserValidator'

export default class UsersController {
    async store({ request, response }: HttpContextContract) {
        try {
            const data = await request.validate(UserValidator)
            const addresses = request.input('addresses')

            const user = await User.create(data)

            await user.related('addresses').createMany(addresses)
            await user.load('addresses')

            user.addresses.map(address => address.serialize())

            return user

        } catch (err) {
            return response.badRequest(err)
        }
    }
}
