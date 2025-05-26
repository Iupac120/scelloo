const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// const start = async () =>{
//     try {
//         app.listen(port,()=>{
//             console.log(`server is listening to port ${port}`)
//         })
//     } catch (error) {
//         console.error("Starting server error", error.msg)
//     }
// }

// start()