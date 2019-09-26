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

  Route.get('clients','ClientController.index');
  Route.post('clients','ClientController.store');

  Route.get('clients/:client_id/detail','ClientController.show');
  Route.get('clients/:client_id','ClientController.edit');
  Route.put('clients/:client_id','ClientController.update');
  Route.delete('clients/:client_id','ClientController.destroy');
}).prefix('api');
