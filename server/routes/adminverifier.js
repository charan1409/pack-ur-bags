const jwt = require('jsonwebtoken');
const User = require('../schemas/admin');

const verifier = async (req,res,next) =>{
    
    try {
        const token = await req.cookies.admintoken;
        let verifieduser = await jwt.verify(token,process.env.ADMIN_TOKEN);
        const user = await User.findOne({email: verifieduser.id});
        if(user){
            req.user = verifieduser;
            next();
        } else{
            res.clearCookie("admintoken");
            return res.render('login');
        }
    } catch (error) {
        res.clearCookie("admintoken");
        return res.render('login');
    }
}

module.exports = verifier;