const jwt = require('jsonwebtoken');

const verifier = async (req,res,next) =>{
    
    try {
        const token = await req.cookies.token;
        let verifieduser = await jwt.verify(token,process.env.ADMIN_TOKEN);
        req.user = verifieduser;
        next();
    } catch (error) {
        res.clearCookie("token");
        return res.redirect('landing');
    }
}

module.exports = verifier;