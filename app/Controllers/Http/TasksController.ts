import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Task from 'App/Models/Task'
import TaskValidator from '../../Validators/TaskValidator'

export default class TasksController {

  public async index({ params }: HttpContextContract) {
    const tasks = await Task.query()
      .where('project_id', params.project_id)

    return tasks
  }

  public async store({ request, response, params }: HttpContextContract) {
    try {
      const payload = await request.validate(TaskValidator)

      const task = await Task.create({ ...payload, projectId: params.project_id })

      return task
    } catch (err) {
      return response.badRequest(err)
    }
  }

  public async show({ params }: HttpContextContract) {
    const task = Task.findOrFail(params.id)

    return task
  }

  public async update({ request, params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)

    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    task.merge(data)

    await task.save()

    return task
  }

  public async destroy({ params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)

    await task.delete()
  }
}
