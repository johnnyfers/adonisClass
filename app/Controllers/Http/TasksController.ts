import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index({ params }: HttpContextContract) {
    const tasks = await Task.query()
      .where('project_id', params.project_id)

    return tasks
  }

  public async create({ }: HttpContextContract) {
    
  }

  public async store({ request, params}: HttpContextContract) {
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    const task = await Task.create({ ...data, projectId: params.project_id})

    return task
  }

  public async show({ params }: HttpContextContract) {
    const task = Task.findOrFail(params.id)

    return task
  }

  public async update({ request, params}: HttpContextContract) {
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

  public async destroy({ request, params}: HttpContextContract) {
    const task = await Task.findOrFail(params.id)

    await task.delete()
  }
}
