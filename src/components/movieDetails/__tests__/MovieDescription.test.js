import { shallowMount, createLocalVue } from "@vue/test-utils";
import MovieDescription from "../MovieDescription";
import PercentCircle from "../../svg/PercentCircle";
import Bookmark from "../../svg/Bookmark";
import Favorite from "../../svg/Favorite";

import FavoritesModule from "../../../store/modules/favorites";

jest.mock("../../../utilities/postFetch");

import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("MovieDescription", () => {
  let store;
  let wrapper;
  let actions;
  let state;
  beforeEach(() => {
    actions = {
      addToFavorites: jest.fn(() => {state.isMovieFavorited = true}),
      removeFromFavorites: jest.fn(() => {state.isMovieFavorited = false})
    };

    state = {
      isMovieFavorited: false
    };

    store = new Vuex.Store({
      modules: {
        FavoritesModule: {
          state,
          getters: FavoritesModule.getters
        }
      }
    });
    
    wrapper = shallowMount(MovieDescription, {
      propsData: {
        movie_details: {
          backdrop_path: "/wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg"
        }
      },
      store,
      localVue
    });
  });

  it("addToFavorites gets called addToFavorites when favorites button is clicked", () => {
    wrapper.setMethods({ addMovieToFavorites:jest.fn() })

    wrapper
      .find('[data-test="movie-overview-favorites-button"]')
      .trigger("click");

    expect(wrapper.vm.addMovieToFavorites).toHaveBeenCalled();
  });

  it("favorites button default icon fill is #fff", () => {
    expect(wrapper.find(Favorite).props("fill")).toBe("#fff");
  });

  it("if movie is not favorited and addToFavorites is clicked, icon in favorite button becomes of color #f70963", () => {

    actions.addToFavorites()
 
    expect(wrapper.find(Favorite).props("fill")).toBe("#f70963");
  });

  it("if movie is favorited and addToFavorites is clicked, icon in favorite button becomes of color #fff", () => {
    
    actions.removeFromFavorites()
 
    expect(wrapper.find(Favorite).props("fill")).toBe("#fff");
  });

  it("has a PercentCircle", () => {
    expect(wrapper.contains(PercentCircle)).toBe(true);
  });
  it("has a Bookmark button", () => {
    expect(wrapper.contains(Bookmark)).toBe(true);
  });
  it("has a Favorites button", () => {
    expect(wrapper.contains(Favorite)).toBe(true);
  });
  describe("methods", () => {
    it("sliceData returns correct value if argument is not undefined", () => {
      const result = wrapper.vm.sliceDate("2005-04-12");
      expect(result).toBe("2005");
    });
    it("sliceData returns correct value if argument is undefined", () => {
      const result = wrapper.vm.sliceDate(undefined);
      expect(result).toBe("...");
    });
    it("getPosterPath calls generatePosterPath and returns correct value", () => {
      const path = "/wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg";
      const result = wrapper.vm.getPosterPath(path);
      expect(result).toBe(
        "http://image.tmdb.org/t/p/original//wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg"
      );
    });
  });
});
