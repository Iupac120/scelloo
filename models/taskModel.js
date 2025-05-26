const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
      defaultValue: 'pending'
    },
    timeSpent: {
      type: DataTypes.INTEGER, 
      defaultValue: 0
    }
  })

  return Task
}