
const jwt = require('jsonwebtoken');
const { User } = require('../models')
const jwtConfig = require('../config/jwt')

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user.id }, jwtConfig.secret, { 
      expiresIn: jwtConfig.expiresIn 
    })
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (err) {
    next(err);
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return next(new Error('Please provide email and password'));
    }
    const user = await User.findOne({ where: { email } })
    if (!user || !(await user.comparePassword(password))) {
      return next(new Error('Incorrect email or password'))
    }
    const token = jwt.sign({ id: user.id }, jwtConfig.secret, { 
      expiresIn: jwtConfig.expiresIn 
    })
    
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (err) {
    next(err)
  }
}