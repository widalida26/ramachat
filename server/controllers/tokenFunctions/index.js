require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '15s' });
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
};
