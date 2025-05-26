const { Task } = require('../models');

exports.getTimeReport = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      attributes: ['id', 'title', 'timeSpent']
    }) 
    const totalTime = tasks.reduce((sum, task) => sum + task.timeSpent, 0);
    res.status(200).json({
      status: 'success',
      data: {
        tasks,
        totalTime
      }
    })
  } catch (err) {
    next(err);
  }
}

exports.getCompletionReport = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id }
    })
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    res.status(200).json({
      status: 'success',
      data: {
        totalTasks,
        completedTasks,
        completionRate: completionRate.toFixed(2) + '%'
      }
    })
  } catch (err) {
    next(err)
  }
}