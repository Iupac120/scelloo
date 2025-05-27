const {Sequelize} = require("sequelize")

const config = {
    db_name:process.env.DB_NAME,
    db_username:process.env.DB_USERNAME,
    db_password:process.env.DB_PASSWORD,
    db_dialect:process.env.DB_DIALECT || "postgres",
    db_host:process.env.DB_HOST || "localhost",
    db_port:parseInt(process.env.DB_PORT) || 54321,
    db_use_ssl: process.env.DB_USE_SSL === 'true'
}

//create new sequelize instance
const sequelize = new Sequelize(
    config.db_name,
    config.db_username,
    config.db_password,
    {
        host:config.db_host,
        dialect:config.db_dialect,
        port:config.db_port,
        logging:false,
        dialectOptions:config.db_use_ssl
        ?
        {
            ssl:{
                required:true,
                rejectUnauthorized:false
            }
        }
        :{}
    }
)

//initial database function
const initializeDatabase = async ()=>{
    try {
        await sequelize.authenticate()
        console.log("Connection to database successful")

        await sequelize.sync()
        console.log("Database syn successfully")
    } catch (error) {
        console.error("Datase initialization failed to connect pg", error)
        throw error
    }
}

initializeDatabase()
module.exports = sequelize