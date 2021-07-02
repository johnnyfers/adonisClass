import Route from '@ioc:Adonis/Core/Route'

Route.post('users', 'UsersController.store')

Route.post('sessions', 'SessionsController.store')

Route.post('reset', 'ForgotPasswordsController.store')
Route.put('reset', 'ForgotPasswordsController.update')

Route.get('files/:id', 'FilesController.show')

Route.group(() => {
    Route.post('files', 'FilesController.store')

    Route.resource('projects', 'ProjectsController').apiOnly()
}).middleware('auth')

