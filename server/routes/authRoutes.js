const authController = require("../controllers/authController");
const emailController = require("../controllers/emailController");
const { isAuth } = require("../services/isAuth");

module.exports = app => {
  app.post("/user", authController.getUser);

  app.post("/user/signup", authController.signup);

  app.post("/user/signin", authController.signin);

  app.get("/confirmation/:token", emailController.confirmEmail);

  app.post("/forgot", emailController.forgot);

  app.get("/reset/:token", emailController.forgotTokenGet);

  app.post("/reset/:token", emailController.forgotTokenPost);

  app.post("/update", authController.updateUserData);
};
