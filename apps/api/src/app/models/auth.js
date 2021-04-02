function sessionAuth(req, email)
{
    req.session.isAuth = true;
    req.session.email = email;
}
 
module.exports = sessionAuth;