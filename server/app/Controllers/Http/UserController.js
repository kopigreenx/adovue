'use strict'
const User = use('App/Models/User');
class UserController {

  async register({request}){
    const {username,email,password} = request.all();
    const user = await User.create({
      username,email,password
    });
    return user;
  }

  async login({request,auth}){
    const {username,password} = request.all();
    const token = await auth.attempt(username,password);
    return token;

  }
}

module.exports = UserController
