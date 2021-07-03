import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Project from './Project'
import File from './File'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public fileId: number

  @column()
  public projectId: number

  @column()
  public title: string

  @column()
  public description: string

  @column.dateTime()
  public dueDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Project)
  public project: BelongsTo<typeof Project>

  @belongsTo(() => File)
  public file: BelongsTo<typeof File>
}