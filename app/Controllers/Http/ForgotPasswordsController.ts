import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import crypto from 'crypto'
import { DateTime } from 'luxon'
import moment from 'moment'

import User from 'App/Models/User'
import ForgotPasswordValidator from '../../Validators/ForgotPasswordValidator'

export default class ForgotPasswordsController {
    async store({ request, response }: HttpContextContract) {
        try {
            const email = request.input('email')
            const user = await User.findBy('email', email)

            user!.tkn = crypto.randomBytes(10).toString('hex')
            user!.tokenCreatedAt = DateTime.local()

            await user!.save()

            await Mail.send(
                message => {
                    message
                        .to(user!.email)
                        .from('johnny@adonis.com', 'Johhny | Luby')
                        .subject('Reset password')
                        .htmlView('forgot_password', {
                            email,
                            token: user!.tkn,
                            link: `${request.input('request_url')}?token=${user!.tkn}`
                        })
                }
            )
        } catch (err) {
            return response.badRequest(err)
        }
    }

    async update({ request, response }: HttpContextContract) {
        const { token, password } = await request.validate(ForgotPasswordValidator)

        const user = await User.findBy('tkn', token)

        if (!user) {
            return response.status(404).send('token cant be found')
        }

        const tokenExpired = moment()
            .subtract('7', 'days')
            .isAfter(user?.tokenCreatedAt)

        if (tokenExpired) {
            return response.status(401).send('expired token')
        }

        user.tkn = ''
        user.tokenCreatedAt = DateTime.local()
        user.password = password

        await user.save()
    }
}
