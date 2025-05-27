
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const jwtConfig = require('../config/jwt');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Input field is missing' })
    }
    const exists = await User.findOne({ where: { email } })
    if (exists) {
      return res.status(400).json({ message: 'Email already registered' })
    }
    const user = await User.create({ username, email, password })
    const token = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    })
    return res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    })
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }
    const user = await User.findOne({ where: { email } })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Incorrect email or password' })
    }
    const token = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    })
    return res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    })
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
