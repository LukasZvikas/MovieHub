const moviesController = require("../controllers/moviesController");
module.exports = app => {
  app.post("/user/get_user_favorites", moviesController.getList);

  app.post("/user/add_to_favorites", moviesController.addToList);

  app.post("/user/check_if_favorited", moviesController.checkIfListed);

  app.post("/user/get_user_watchlist", moviesController.getList);

  app.post("/user/add_to_watchlist", moviesController.addToList);

  app.post("/user/check_if_watchlisted", moviesController.checkIfListed);

  app.post("/user/add_to_watched", moviesController.addToList);

  app.post("/user/check_if_watched", moviesController.checkIfListed);
};
