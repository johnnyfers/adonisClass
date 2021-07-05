import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ProjectValidator from '../../Validators/ProjectValidator'
import Project from 'App/Models/Project'

export default class ProjectsController {
  public async index({ request }: HttpContextContract) {
    const { page } = request.qs()

    const projects = await Project.query().preload('user').paginate(page, 10)

    const projectsJSON = projects.serialize()

    return projectsJSON
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const payload = await request.validate(ProjectValidator)
      const project = await Project.create({ ...payload, userId: auth.user?.id })

      return project

    } catch (err) {
      return response.badRequest(err.messages)
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const project = await Project.findOrFail(params.id)

      await project.load('user')
      await project.load('tasks')

      return response.status(200).json(project)

    } catch (err) {
      response.badRequest(err.messages)
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const project = await Project.findOrFail(params.id)

      const payload = await request.validate(ProjectValidator)

      project.merge(payload)

      await project.save()

      return project

    } catch (err) {
      return response.badRequest(err.messages)
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const project = await Project.findOrFail(params.id)

      await project.delete()

      return response.status(200).json(project)

    } catch (err) {
      response.badRequest(err.messages)
    }
  }
}
