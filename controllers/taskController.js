const { Task } = require('../models');

exports.getAllTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const status = req.query.status
    const offset = (page - 1) * limit
    const where = { userId: req.user.id }
    if (status) where.status = status
    const { rows: tasks, count: total } = await Task.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    })
    return res.status(200).json({
      status: 'success',
      page,
      totalPages: Math.ceil(total / limit),
      results: tasks.length,
      data: { tasks }
    })
  } catch (err) {
    console.error('Fetch tasks error:', err);
    return res.status(500).json({ message: 'Failed to retrieve tasks' });
  }
}

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' })
    }
    const task = await Task.create({
      title,
      description,
      status: status || 'pending',
      userId: req.user.id
    })
    return res.status(201).json({
      status: 'success',
      message: 'Task created',
      data: { task }
    })
  } catch (err) {
    console.error('Create task error:', err);
    return res.status(500).json({ message: 'Failed to create task' });
  }
}

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, timeSpent } = req.body;
    const task = await Task.findOne({ where: { id, userId: req.user.id } })
    if (!task) {
      return res.status(404).json({ message: 'No task found with that ID' })
    }
    await task.update({
      title: title ?? task.title,
      description: description ?? task.description,
      status: status ?? task.status,
      timeSpent: timeSpent ?? task.timeSpent
    })
    return res.status(200).json({
      status: 'success',
      message: 'Task updated',
      data: { task }
    })
  } catch (err) {
    console.error('Update task error:', err)
    return res.status(500).json({ message: 'Failed to update task' })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: 'No task found with that ID' });
    }
    await task.destroy();
    return res.status(204).json({
      status: 'success',
      message: 'Task deleted',
      data: null
    })
  } catch (err) {
    console.error('Delete task error:', err);
    return res.status(500).json({ message: 'Failed to delete task' });
  }
}
