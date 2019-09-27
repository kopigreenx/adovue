'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clients
 */
const Cli = use('App/Models/Client');
const {
  validate
} = use('Validator');
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
  async index({
    auth
  }) {
    const clientData = await Cli.all()
    return clientData;
  }

  /**
   * Create/save a new client.
   * POST clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({
    request
  }) {
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
    const client = new Cli();
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
  async show({
    params
  }) {
    const {
      client_id
    } = params;
    const client = new Cli();
    const clientData = await client.find(client_id)
    return clientData;
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
  async edit({
    params
  }) {
    const {
      client_id
    } = params;
    const clientData = await Cli.find(client_id);
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
  async update({
    params,
    request
  }) {
    const {
      client_id
    } = params;
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
  async destroy({
    params
  }) {
    const {
      client_id
    } = params;

    const client = await Cli.find(client_id);
    await client.delete()
    return client;
  }
}

module.exports = ClientController