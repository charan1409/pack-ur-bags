const jwt = require('jsonwebtoken');
const express  =require('express');
const app = express();
const cookies = require("cookie-parser");

app.use(cookies());

const verifier = async (req,res,next) =>{
    
    // if(!token) return res.status(400).json('invalid access')
    
    try {
        const token = await req.cookies.token;
        console.log('token taken');
        let verifieduser = await jwt.verify(token,process.env.ACCESS_TOKEN);
        req.user = verifieduser;
        next();
    } catch (error) {
        console.log(error);
        res.clearCookie("token");
        return res.redirect('/');
    }
}

module.exports = verifier;


// module.exports = {
//     signAccessToken: (userId) => {
//         return new Promise((resolve,reject) => {
//             const payload = {}
//             const secret = process.env.ACCESS_TOKEN
//             const options = {
//                 expressIn: '1h',
//                 issuer: 'PACKYOURBAGS.com',
//                 audience: userId,
//             }
//             jwt.sign(payload,secret,options,(err,token) => {
//                 if(err) return reject(err);
//                 resolve(token)
//             })
//         })
//     }
// }