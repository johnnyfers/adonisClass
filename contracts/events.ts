
import Task from "App/Models/Task";

declare module '@ioc:Adonis/Core/Event' {

  interface EventsList {
    'new:task': Task
  }
}
