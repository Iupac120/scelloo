const express = require('express')
const router = express.Router()

const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const {
  getTimeReport,
  getCompletionReport
} = require("../controllers/reportController")

const authMiddleware = require('../middlewares/authMiddleware')
const { restrictTo } = require('../middlewares/roleMiddleware')
const validate = require('../middlewares/validate');
const { taskSchema } = require('../utils/taskValidator')

router.use(authMiddleware.protect)

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks for the authenticated user
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Task list retrieved successfully
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           example:
 *             title: "Complete Swagger Docs"
 *             description: "Add detailed Swagger documentation with examples"
 *             status: "in-progress"
 *             timeSpent: 2.5
 *     responses:
 *       201:
 *         description: Task created successfully
 *
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           example:
 *             title: "Update Task Title"
 *             description: "Updated task description for testing"
 *             status: "completed"
 *             timeSpent: 4
 *     responses:
 *       200:
 *         description: Task updated successfully
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Task deleted
 */

/**
 * @swagger
 * /report-time:
 *   get:
 *     summary: Get total time spent on all tasks
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Time report generated
 *
 * /report:
 *   get:
 *     summary: Get task completion report
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Completion report generated
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           example: "Write Unit Tests"
 *         description:
 *           type: string
 *           example: "Ensure all controllers have unit test coverage"
 *         status:
 *           type: string
 *           enum: [pending, in-progress, completed]
 *           example: "pending"
 *         timeSpent:
 *           type: number
 *           example: 1.5
 */





router.post('/tasks', restrictTo('admin', 'user'), validate(taskSchema), createTask)
router.get('/tasks', restrictTo('admin', 'user'), getAllTasks)
router.get('/report-time', restrictTo('user', 'admin'), getTimeReport)
router.get('/report', restrictTo('user', 'admin'), getCompletionReport)
router.put('/tasks/:id', restrictTo('admin', 'user'), validate(taskSchema), updateTask)

// Admin only route
router.delete('/tasks/:id', restrictTo('admin'), deleteTask)

module.exports = router;


