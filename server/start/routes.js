'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(()=>{

  Route.post('auth/register','UserController.register');
  Route.post('auth/login','UserController.login');

  Route.get('clients','ClientController.index').middleware('auth');
  Route.post('clients','ClientController.store').middleware('auth');

  Route.get('clients/:client_id/detail','ClientController.show').middleware('auth');
  Route.get('clients/:client_id','ClientController.edit').middleware('auth');
  Route.put('clients/:client_id','ClientController.update').middleware('auth');
  Route.delete('clients/:client_id','ClientController.destroy').middleware('auth');
}).prefix('api');
