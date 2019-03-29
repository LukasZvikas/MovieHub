const authController = require("../controllers/authController");
const { isAuth } = require("../services/isAuth");

module.exports = app => {
  app.get("/user", isAuth, authController.getUser);

  app.post("/user/signup", authController.signup);

  app.post("/user/signin", authController.signin);

  app.post("/update", isAuth, authController.updateUserData);
};
