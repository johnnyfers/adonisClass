import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import SessionValidator from '../../Validators/SessionValidator'

export default class SessionsController {
    async store({ auth, request, response }: HttpContextContract) {
        const { email, password } = await request.validate(SessionValidator)

        try {
            const token = await auth.use('api').attempt(email, password, {
                expiresIn: '7days'
            })
            return token
        } catch {
            return response.badRequest('Invalid credentials')
        }
    }
}
