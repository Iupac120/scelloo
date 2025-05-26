
const { Task } = require('../models');

exports.getAllTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query
    const offset = (page - 1) * limit
    const where = { userId: req.user.id }
    if (status) where.status = status
    const tasks = await Task.findAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: {
        tasks
      }
    });
  } catch (err) {
    next(err)
  }
}

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body
    const task = await Task.create({
      title,
      description,
      status: status || 'pending',
      userId: req.user.id
    })
    res.status(201).json({
      status: 'success',
      msg:"task created",
      data: {
        task
      }
    })
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, description, status, timeSpent } = req.body
    
    const task = await Task.findOne({ where: { id, userId: req.user.id } })
    
    if (!task) {
      return next(new Error('No task found with that ID'))
    }
    const updatedTask = await task.update({
      title: title || task.title,
      description: description || task.description,
      status: status || task.status,
      timeSpent: timeSpent || task.timeSpent
    })
    res.status(200).json({
      status: 'success',
      msg:"Task updated",
      data: {
        task: updatedTask
      }
    });
  } catch (err) {
    next(err)
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const task = await Task.findOne({ where: { id, userId: req.user.id } })
    if (!task) {
      return next(new Error('No task found with that ID'))
    }
    await task.destroy()
    res.status(204).json({
      status: 'success',
      msg:"Task deleted",
      data: null
    })
  } catch (err) {
    next(err);
  }
}