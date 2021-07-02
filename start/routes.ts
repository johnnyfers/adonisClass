import Route from '@ioc:Adonis/Core/Route'


Route.post('users', 'UsersController.store')

Route.post('sessions', 'SessionsController.store')

Route.post('reset', 'ForgotPasswordsController.store')
Route.put('reset', 'ForgotPasswordsController.update')