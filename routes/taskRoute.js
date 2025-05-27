const express = require('express')
const router = express.Router()

const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController')

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
 *   - name: Tasks
 *     description: Task management endpoints
 *   - name: Reports
 *     description: Reports endpoints
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           example: "Complete Swagger Docs"
 *         description:
 *           type: string
 *           example: "Add detailed Swagger documentation with examples"
 *         status:
 *           type: string
 *           enum: [pending, in-progress, completed]
 *           example: "in-progress"
 *         timeSpent:
 *           type: number
 *           example: 2.5
 *
 * security:
 *   - bearerAuth: []
 *
 * paths:
 *   /tasks:
 *     post:
 *       summary: Create a new task
 *       tags:
 *         - Tasks
 *       security:
 *         - bearerAuth: []
 *       description: >
 *         Create a new task. Allowed roles: admin, user.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *               title: "Complete Swagger Docs"
 *               description: "Add detailed Swagger documentation with examples"
 *               status: "in-progress"
 *               timeSpent: 2.5
 *       responses:
 *         '201':
 *           description: Task created successfully
 *         '401':
 *           description: Unauthorized - missing or invalid token
 *         '403':
 *           description: Forbidden - insufficient permissions
 *
 *     get:
 *       summary: Get all tasks for authenticated user
 *       tags:
 *         - Tasks
 *       security:
 *         - bearerAuth: []
 *       description: >
 *         Returns all tasks. Allowed roles: admin, user.
 *       responses:
 *         '200':
 *           description: List of tasks
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Task'
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *
 *   /tasks/{id}:
 *     put:
 *       summary: Update a task by ID
 *       tags:
 *         - Tasks
 *       security:
 *         - bearerAuth: []
 *       description: >
 *         Update task details. Allowed roles: admin, user.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Task ID
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *               title: "Update Task Title"
 *               description: "Updated task description for testing"
 *               status: "completed"
 *               timeSpent: 4
 *       responses:
 *         '200':
 *           description: Task updated successfully
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '404':
 *           description: Task not found
 *
 *     delete:
 *       summary: Delete a task by ID (Admin only)
 *       tags:
 *         - Tasks
 *       security:
 *         - bearerAuth: []
 *       description: >
 *         Delete task. Allowed role: admin only.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Task ID
 *       responses:
 *         '204':
 *           description: Task deleted successfully (no content)
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden - admin role required
 *         '404':
 *           description: Task not found
 *
 *   /report-time:
 *     get:
 *       summary: Get total time spent on all tasks
 *       tags:
 *         - Reports
 *       security:
 *         - bearerAuth: []
 *       description: >
 *         Retrieve the total time spent on all tasks. Allowed roles: user, admin.
 *       responses:
 *         '200':
 *           description: Time report generated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   totalTime:
 *                     type: number
 *                     example: 45.5
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *
 *   /report:
 *     get:
 *       summary: Get task completion report
 *       tags:
 *         - Reports
 *       security:
 *         - bearerAuth: []
 *       description: >
 *         Retrieve the report of task completion statistics. Allowed roles: user, admin.
 *       responses:
 *         '200':
 *           description: Completion report generated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   totalTasks:
 *                     type: integer
 *                     example: 20
 *                   completedTasks:
 *                     type: integer
 *                     example: 15
 *                   pendingTasks:
 *                     type: integer
 *                     example: 3
 *                   inProgressTasks:
 *                     type: integer
 *                     example: 2
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 */

router.post('/tasks', restrictTo('admin', 'user'), validate(taskSchema), createTask)
router.get('/tasks', restrictTo('admin', 'user'), getAllTasks)
router.get('/report-time', restrictTo('user', 'admin'), getTimeReport)
router.get('/report', restrictTo('user', 'admin'), getCompletionReport)
router.put('/tasks/:id', restrictTo('admin', 'user'), validate(taskSchema), updateTask)

// Admin only route
router.delete('/tasks/:id', restrictTo('admin'), deleteTask)

module.exports = router
