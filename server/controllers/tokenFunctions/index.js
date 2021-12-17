require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '6h' });
  },
  sendAccessToken: (res, accessToken) => {
    return res
      .status(200)
      .cookie('jwt', accessToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .json({ data: { data: accessToken }, message: 'ok' });
  },
  isAuthorized: (cookies) => {
    const authorization = cookies.jwt;
    if (!authorization) {
      return null;
    }
    const token = authorization.split(' ')[0];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
