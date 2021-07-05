import { EventsList } from '@ioc:Adonis/Core/Event'

import Mail from '@ioc:Adonis/Addons/Mail'
import Application from '@ioc:Adonis/Core/Application'

export default class TaskListener {
  public async onNewTask(task: EventsList['new:task']) {
    if (!task.userId && !task.$dirty.userId) return

   

    await task.load('user')
    await task.load('file')

    const { email, username } = task.user
    const file = task.file

    const { title } = task

    await Mail.send(message => {
      message
        .to(email)
        .from('johnny@adonis.com', 'Johhny | Luby')
        .subject('New Task for you')
        .htmlView('new_task', {
          username,
          title,
          hasAttachment: !!file
        })

      if (file) {
        message.attach(Application.tmpPath(`uploads/${file.file}`), {
          filename: file.name
        })
      }
    })

  }
}
