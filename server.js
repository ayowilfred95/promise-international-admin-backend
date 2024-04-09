const app = require("./entry.js");
const sequelize = require("./database");
const ip = require("ip");
const logger = require('./utils/logger.js');
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;




sequelize
  .authenticate()
  .then(function () {
    app.listen(PORT,()=>
    logger.info(`Server running on IPAdrress: ${ip.address()}:  and Port : ${PORT}`)
);
  })
  .catch(function (error) {
    console.log("Unable to connect to the database:", error);
  });



