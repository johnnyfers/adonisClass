import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  async store({ request }: HttpContextContract) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }
}
