'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clients
 */
const Client = use('App/Models/Client');
const { validate } = use('Validator');
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
  async index({response}) {
    const clientData = await Client.all();
    return response.json(clientData);
  }

  /**
   * Create/save a new client.
   * POST clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.all();
    const rules = {
      last_name: 'required',
      address: 'required',
      email: 'required',
      contact: 'required',
    };
    const validation = await validate(data, rules);
    if (validation.fails()) {
      return validation.messages()
    }
    const client = new Client();
    client.fill(data);
    await client.save();
    return client;
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
  async show({ params }) {
    const {client_name} = params;
    const clientData = await Client.where({$or: [{first_name:{'$regex': client_name}},{last_name:{'$regex': client_name}}] }).fetch();
    return clientData;
  }
  /**
   * Update client details.
   * PUT or PATCH clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params,request }) {
    const { client_id } = params;
    const data = request.all();
    const client = await Client.find(client_id);
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
  async destroy({ params,response }) {
    const { client_id } = params;
    const client = await Client.find(client_id);
    await client.delete()
    return response.status(200).json({
      "delete_status":"success",
      "data"  :client
    });
  }
}

module.exports = ClientController