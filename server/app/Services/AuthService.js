const Invalidaccess = use('App/Exceptions/InvalidAccessException');
const Resourceaccess = use('App/Exceptions/ResourceAccessException');

class AuthService{
  CheckAuth(resource,user){
    //Check Resource before Delete

    if(!resource){
      throw new Resourceaccess();
    }

    //Check user_id before delete
    /*
    console.log('Auth service running')
    if(user._id !== resource.user_id){
      console.log(user._id,resource.user_id)
      throw new Invalidaccess();
    }
    */
  }
}

module.exports = new AuthService();
