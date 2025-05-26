const Joi = require('joi')

const taskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
})

module.exports = { taskSchema }
