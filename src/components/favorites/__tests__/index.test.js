import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Favorites from "../";
import PercentCircle from "../../svg/PercentCircle";
import Vuex from "vuex";
import { movie_data } from "../../../utilities/movieMockData";

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("../../../utilities/fetch");
jest.mock("../../../utilities/postFetch");

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
