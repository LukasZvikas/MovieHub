const moviesController = require("../controllers/moviesController");
const { isAuth } = require("../services/isAuth");

module.exports = app => {
  app.get("/user/get_user_favorites", isAuth, moviesController.getList);

  app.post("/user/add_to_favorites", isAuth, moviesController.addToList);

  app.post("/user/check_if_favorited", isAuth, moviesController.checkIfListed);

  app.get("/user/get_user_watchlist", isAuth, moviesController.getList);

  app.post("/user/add_to_watchlist", isAuth, moviesController.addToList);

  app.post("/user/check_if_watchlisted", isAuth, moviesController.checkIfListed);

  app.post("/user/add_to_watched", isAuth, moviesController.addToList);

  app.post("/user/check_if_watched", isAuth, moviesController.checkIfListed);
};
