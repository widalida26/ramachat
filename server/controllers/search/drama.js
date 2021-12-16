module.exports = (req, res) => {
  let dramaId = req.query['drama-id'];
  console.log(dramaId);

  res.end();
  //   console.log(444, Users);
  //   console.log(666, req.body);
  //   const { user_id, password } = req.body;
  //   console.log(555, user_id, password);
  //   Users.findOne({
  //     where: {
  //       user_id,
  //       password,
  //     },
  //   })
  //     .then((data) => {
  //       console.log(999, data);
  //       if (!data) {
  //         return res.status(404).send('invalid user');
  //       } else {
  //         delete data.dataValues.password;
  //         const accessToken = generateAccessToken(data.dataValues);
  //         sendAccessToken(res, accessToken);
  //       }
  //     })
  //     .catch((err) => {
  //       return res.status(500).send('err');
  //       console.log(err);
  //     });
};
