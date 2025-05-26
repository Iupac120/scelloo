const jwt = require('jsonwebtoken')
const { User } = require('../models')
const jwtConfig = require('../config/jwt')

exports.protect = async (req, res, next) => {
  try {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }  
    if (!token) {
      return next(new Error('You are not logged in! Please log in to get access'));
    }
    const decoded = jwt.verify(token, jwtConfig.secret)
    const currentUser = await User.findByPk(decoded.id)
    if (!currentUser) {
      return next(new Error('The user belonging to this token no longer exists'));
    } 
    req.user = currentUser
    next()
  } catch (err) {
    next(err)
  }
}

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error('You do not have permission to perform this action'));
    }
    next()
  }
}