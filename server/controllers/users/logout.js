module.exports = (req, res) => {
  res.cookie('jwt', '').status(200).send('Ok');
};
