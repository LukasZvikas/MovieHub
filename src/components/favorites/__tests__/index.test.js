import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Favorites from "../";
import PercentCircle from "../../svg/PercentCircle";
import Vuex from "vuex";
const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("../../../utilities/fetch");
jest.mock("../../../utilities/postFetch");

const movie_data = {
  movies: [
    {
      id: 332562,
      poster_path: "wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg",
      title: "A Star Is Born",
      release_date: "2018-08-24",
      vote_average: 8.7,
      overview:
        "Seasoned musician Jackson Maine discovers—and falls in love with—struggling artist Ally. She has just about given up on her dream to make it big as a singer",
      genres: [{ name: "Drama" }, { name: "Music" }],
      backdrop_path: "/wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg"
    }
  ]
};

describe("Movie Details after fetch", () => {
  let store;
  let favGetters = {
    isFavorite: () => true
  };

  let authGetters = { isLoggedIn: () => true };

  store = new Vuex.Store({
    modules: {
      FavoritesModule: {
        state: {},
        favGetters
      },
      AuthModule: {
        state: {},
        authGetters
      }
    }
  });

  let wrapper = mount(Favorites, {
    store,
    localVue
  });
  beforeEach(() => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({ ...movie_data });
    });
  });
  it("has one favorites item", () => {
    expect(wrapper.findAll('[data-test="favorites-list-item"]')).toHaveLength(
      1
    );
  });
  it("favorites movie title is correct", () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
    expect(wrapper.find('[data-test="favorites-list-item-title"]').text()).toBe(
      "A Star Is Born"
    );
  });
  it("favorites item has a percent circle component", () => {
    expect(wrapper.contains(PercentCircle)).toBe(true);
  });
  it("favorites items' percent component is rendered with the correct vote average", () => {
    expect(wrapper.find('[data-test="movie-overview-average"]').text()).toBe(
      "87%"
    );
  });
});
