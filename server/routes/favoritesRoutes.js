const favoritesController = require("../controllers/favoritesController");
module.exports = app => {
  app.post("/user/get_user_favorites", favoritesController.getFavorites);
  app.post("/user/add_to_favorites", favoritesController.addFavorite);
  app.post("/user/check_if_favorited", favoritesController.checkIfFavorited);
};
