

const { Task } = require('../models');


exports.getTimeReport = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      attributes: ['id', 'title', 'timeSpent']
    })
    const totalTime = tasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0)
    return res.status(200).json({
      status: 'success',
      data: {
        totalTime,
        tasks
      }
    })
  } catch (err) {
    console.error('Time Report Error:', err);
    return res.status(500).json({ message: 'Failed to generate time report' })
  }
}


exports.getCompletionReport = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      attributes: ['status']
    })
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.status === 'completed').length
    const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : '0.00'

    return res.status(200).json({
      status: 'success',
      data: {
        totalTasks,
        completedTasks,
        completionRate: `${completionRate}%`
      }
    })
  } catch (err) {
    console.error('Completion Report Error:', err);
    return res.status(500).json({ message: 'Failed to generate completion report' })
  }
}
