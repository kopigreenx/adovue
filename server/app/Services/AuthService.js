
class AuthService{
  CheckAuth(resource,user){
    //Check Resource before Delete
    /*
    if(!client){
      return response.status(404).json({
        messages:'Data Not Found'
      })
    }
     */
    //Check user_id before delete
    if(user._id !== resource.user_id){
      console.log(user._id,resource.user_id)
      throw new Error();
    }

  }
}

module.exports = new AuthService();
