require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '6h' });
  },
  sendAccessToken: (res, accessToken) => {
    return res.status(200).cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  },
  isAuthorized: (req) => {
<<<<<<< HEAD
    const authorization = req.jwt;

=======
    const authorization = req;
>>>>>>> 013b24a36e487bdc4f38dd63d8e0f13cb78a6b04
    if (!authorization) {
      return null;
    }
    const token = authorization.split(' ')[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
