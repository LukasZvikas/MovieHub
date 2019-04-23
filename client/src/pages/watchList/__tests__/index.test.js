import { mount, createLocalVue } from "@vue/test-utils";
import WatchList from "../";
import PercentCircle from "../../../components/svg/PercentCircle";
import Clock from "../../../components/svg/Clock";
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

  let wrapper = mount(WatchList, {
    store,
    localVue
  });
  beforeEach(() => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({ ...movie_data });
    });
  });

  it("has one watchlist item", () => {
    expect(wrapper.findAll('[data-test="watchlist-list-item"]')).toHaveLength(
      1
    );
  });
  it("watchlist movie title is correct", () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
    expect(wrapper.find('[data-test="watchlist-list-item-title"]').text()).toBe(
      "A Star Is Born"
    );
  });
  it("watchlist item has a percent circle component", () => {
    expect(wrapper.contains(PercentCircle)).toBe(true);
  });
  it("watchlist items' percent component is rendered with the correct vote average", () => {
    expect(wrapper.find('[data-test="movie-overview-average"]').text()).toBe(
      "87%"
    );
  });
  it("watchlist item has a button", () => {
    expect(
      wrapper.findAll('[data-test="watchlist-list-item-button"]')
    ).toHaveLength(1);
  });
  it("watchlist item has a button has a correct name", () => {
    expect(
      wrapper.find('[data-test="watchlist-list-item-button"]').text()
    ).toBe("Show more");
  });
  it("watchlist item header has a Clock icon", () => {
    expect(wrapper.contains(Clock)).toBe(true);
  });
  it("watchlist item header has a Clock icon", () => {
    expect(wrapper.contains(Clock)).toBe(true);
  });
  it("watchlist item header has a correct heading text", () => {
    expect(
      wrapper.find('[data-test="watchlist-list-item-date-heading"]').text()
    ).toBe("Release Date:");
  });
  it("watchlist item header has a correct date", () => {
    expect(wrapper.find('[data-test="watchlist-list-item-date"]').text()).toBe(
      "Aug 24 2018"
    );
  });
});
