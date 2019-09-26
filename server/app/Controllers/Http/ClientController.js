'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clients
 */
const Cli = use('App/Models/Client');
const { validate } = use('Validator');
const AuthService = use('App/Services/AuthService');
class ClientController {
  /**
   * Show a list of all clients.
   * GET clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
    //const user = await auth.getUser();
    //console.log(user._id);

    const client = await Cli.all()

    return client;
  }

  /**
   * Render a form to be used for creating a new client.
   * GET clients/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, auth }) {

  }

  /**
   * Create/save a new client.
   * POST clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response,auth }) {
    //const user = await auth.getUser();
    const data = request.all();

    const rules = {
      first_name: 'required',
      last_name: 'required',
      address: 'required',
      email: 'required',
      contact: 'required',
    };
    const validation = await validate(data, rules);
    if(validation.fails()){
      return validation.messages()
    }
    const callbackData = await user.clients().create(data);
    return response.status(200).json({
      status : "success",
      data : callbackData
    });
  }

  /**
   * Display a single client.
   * GET clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response, auth }) {
    //const user = await auth.getUser();
    const {client_id} = params;
    const client = await Cli.find(client_id)

    return client;
  }

  /**
   * Render a form to update an existing client.
   * GET clients/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, auth , response }) {
    //const user = await auth.getUser();
    const {client_id} = params;
    const client = await Cli.find(client_id);
    AuthService.CheckAuth(client,user);
    return {
      a:user._id,
      b:client.user_id,
      data:client
    }
  }

  /**
   * Update client details.
   * PUT or PATCH clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response , auth }) {
    //const user = await auth.getUser();
    const {client_id} = params;
    const data = request.all();

    const client = await Cli.find(client_id);
    client.merge(data);
    await client.save();
    return client;


  }

  /**
   * Delete a client with id.
   * DELETE clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response , auth }) {
    //const user = await auth.getUser();
    const {client_id} = params;

    const client = await Cli.find(client_id);
    AuthService.CheckAuth(client,user);
    await client.delete()
    return client;
  }
}

module.exports = ClientController
