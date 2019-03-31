const moviesController = require("../controllers/moviesController");
const { isAuth } = require("../services/isAuth");

module.exports = app => {
  app.get("/user/getList/*", isAuth, moviesController.getList);

  app.post("/user/add/*", isAuth, moviesController.addToList);

  app.post("/user/check/*", isAuth, moviesController.checkIfListed);
};
