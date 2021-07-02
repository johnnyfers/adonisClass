import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import crypto from 'crypto'
import { DateTime } from 'luxon'

export default class ForgotPasswordsController {
    async store({ request, response }: HttpContextContract) {
        const email = request.input('email')
        const user = await User.findBy('email', email)

        if (!user) {
            return response.status(404).json({ message: 'email cant be found' })
        }

        user.tkn = crypto.randomBytes(10).toString('hex')
        user.tokenCreatedAt = DateTime.fromJSDate(new Date())

        await user.save()
    }
}
