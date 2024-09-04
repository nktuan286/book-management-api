const authService = require('../services/authService');

exports.login = async (req, res) => {
  try {
    const result = await authService.login({
      email: req.body?.email,
      password: req.body?.password
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

exports.signup = async (req, res) => {
  try {
    const result = await authService.signup({
      email: req.body?.email,
      password: req.body?.password
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}
