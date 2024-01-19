const repo = require("../Database/UserRepository");
async function getUserDetail(request, response, next) {
  try {
    const user = await repo.getUserById(request.user.username);
    response.status(200).send(
      JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        code: user.nationalCode,
        isCompany: user.type == 1,
        email: user.email,
        companyName: user.companyname,
      })
    );
  } catch (e) {
    next(e);
  }
}
async function updateUser(request, response, next) {
  try {
    const user = await repo.getUserById(request.user.username);
    if(user.isCompany){
        user.companyname=request.body.companyName
    }else{
        user.firstName=request.body.firstName,
        user.lastName=request.body.lastName
    }
    user.email=request.body.email
    await repo.updateUser(user)
    response.status(200).send('')
  } catch (e) {
    next(e);
  }
}
module.exports = { getUserDetail,updateUser };
