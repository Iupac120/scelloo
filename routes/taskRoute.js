


const express = require('express')
const router = express.Router()

const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController')

const {getTimeReport,getCompletionReport} = require("../controllers/reportController")

const authMiddleware = require('../middlewares/authMiddleware')
const validate = require('../middlewares/validate')
const { taskSchema } = require('../utils/taskValidator')

router.use(authMiddleware.protect)
router.post('/tasks', validate(taskSchema), createTask)
router.get('/tasks', getAllTasks)
router.put('/tasks/:id', validate(taskSchema), updateTask)
router.delete('/tasks/:id', deleteTask)
router.get('/report-time', getTimeReport)
router.get('/report', getCompletionReport)

module.exports = router

