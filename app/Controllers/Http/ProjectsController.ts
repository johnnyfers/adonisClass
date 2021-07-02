import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'

export default class ProjectsController {
  public async index({ response }: HttpContextContract) {
    const projects = await Project.all()

    return response.send(projects)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = request.only(['title', 'description'])
    const project = await Project.create({ ...data, userId: auth.user?.id })

    return response.status(201).json(project)
  }

  public async show({ response, params  }: HttpContextContract) {
    const project = await Project.findOrFail(params.id)

    await project.load('user')
    await project.load('tasks')

    return response.status(200).json(project)
  }

  public async update({ params, request, response}: HttpContextContract) {
    const project = await Project.findOrFail(params.id)
    const data = request.only(['titles', 'description'])

    project.merge(data)

    await project.save()

    return response.status(203).json(project)
  }

  public async destroy({ params, response}: HttpContextContract) {
    const project = await Project.findOrFail(params.id)

    await project.delete()

    return response.status(200).json(project)
  }
}
