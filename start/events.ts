import Event from '@ioc:Adonis/Core/Event'

Event.on('new:task', 'TaskListener.onNewTask')
