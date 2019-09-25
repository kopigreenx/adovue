'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ResourceAccessException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error,{response}) {
    response.status(404).json({
      messages:'No Data Found!'
    })
  }
}

module.exports = ResourceAccessException
