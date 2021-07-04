import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
	constructor(protected ctx: HttpContextContract) { }

	public schema = schema.create({
		username: schema.string(),

		email: schema.string({}, [
			rules.email(),
		]),

		password: schema.string({}, [
			rules.confirmed()
		])
	})

	public messages = {}
}
