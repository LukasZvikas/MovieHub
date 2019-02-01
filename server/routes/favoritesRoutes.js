const favoritesController = require("../controllers/favoritesController");
module.exports = app => {
  app.post("/user/add_to_favorites", favoritesController.addFavorite);
};
