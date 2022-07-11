const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

const verifier = async (req,res,next) =>{
    
    try {
        const token = await req.cookies.usertoken;
        let verifieduser = await jwt.verify(token,process.env.ACCESS_TOKEN);
        const user = await User.findOne({email: verifieduser.id});
        if(user){
            req.user = verifieduser;
            next();
        } else{
            res.clearCookie("usertoken");
            return res.render('login');
        }
    } catch (error) {
        res.clearCookie("usertoken");
        return res.render('login');
    }
}

module.exports = verifier;