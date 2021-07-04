import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Project from 'App/Models/Project'

export default class ProjectsController {
  public async index({ }: HttpContextContract) {
    let projects = await Project.all()

    return projects
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const newProjectSchema = schema.create({
        title: schema.string({ trim: true }),
        description: schema.string({ trim: true })
      })

      const payload = await request.validate({ schema: newProjectSchema })
      const project = await Project.create({ ...payload, userId: auth.user?.id })

      return response.status(201).json(project)

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

      const projectUpdatedSchema = schema.create({
        title: schema.string({ trim: true }),
        description: schema.string({ trim: true })
      })

      const payload = await request.validate({ schema: projectUpdatedSchema })

      project.merge(payload)

      await project.save()

      return response.status(203).json(project)

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
