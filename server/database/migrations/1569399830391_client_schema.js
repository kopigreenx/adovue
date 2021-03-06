'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up() {
    this.create('clients', (table) => {
      table.increments()
      table.string('first_name', 255)
      table.string('last_name', 255)
      table.string('address', 255)
      table.string('email', 255)
      table.string('contact', 255)
      table.timestamps()
    })
  }

  down() {
    this.drop('clients')
  }
}

module.exports = ClientSchema