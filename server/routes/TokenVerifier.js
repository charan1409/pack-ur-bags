const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

const TokenVerifier = async (req, res, next) => {
  try {
    const token = await req.cookies.user;
    const verifieduser = await jwt.verify(token, process.env.TOKEN);
    console.log(verifieduser);
    console.log(token);
    const user = await User.findOne({ email: verifieduser.id });
    if (user) {
      req.user = verifieduser;
      next();
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

module.exports = TokenVerifier;
