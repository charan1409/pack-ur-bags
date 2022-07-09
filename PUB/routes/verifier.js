const jwt = require('jsonwebtoken');

const verifier = async (req,res,next) =>{
    
    try {
        const token = await req.cookies.token;
        let verifieduser = await jwt.verify(token,process.env.ACCESS_TOKEN);
        req.user = verifieduser;
        next();
    } catch (error) {
        res.clearCookie("token");
        return res.render('login');
    }
}

module.exports = verifier;