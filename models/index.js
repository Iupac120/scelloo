const {DataTypes} = require("sequelize")
const sequelize = require("../config/db")

//import models
const User = require("./userModel")(sequelize,DataTypes)
const Task = require("./taskModel")(sequelize,DataTypes)

const db = {
    sequelize,
    User,
    Task
}

// model association
Object.keys(db).forEach((modelName) =>{
    if(db[modelName].associate){
        db[modelName].associate(db)
    }
}) 

module.exports = db