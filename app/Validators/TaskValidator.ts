import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TaskValidator {
	constructor(protected ctx: HttpContextContract) { }

	public schema = schema.create({
		user_id: schema.number(),
		file_id: schema.number(),
		title: schema.string(),
		description: schema.string(),
		due_date: schema.date(),
	})

	public messages = {}
}
