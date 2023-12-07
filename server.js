const app = require("./entry.js");
const sequelize = require("./database");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(function () {
    app.listen(PORT, () => {
      console.log("server listening on Port", PORT);
    });
  })
  .catch(function (error) {
    console.log("Unable to connect to the database:", error);
  });
