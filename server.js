const app = require('./index.js')
const sequelize = require('./database')
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
  console.log('server listening on Port', PORT)
})
sequelize.authenticate().then(function(){
  console.log("Database connection has been established successfully");
}).catch(function(error){
  console.log('Unable to connect to the database:', error);
});
