'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidAccessException extends LogicalException {
  /**
   * Handle this exception by itself
   */
   handle (error,{response}) {
     response.status(404).json({
       messages:'Restrict Area'
     })
   }
}

module.exports = InvalidAccessException
