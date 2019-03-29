import { mount } from "@vue/test-utils";
import MovieSearchWrapper from "../";
import { search_data } from "../../../utilities/movieMockData";

jest.mock("../../../utilities/fetch");

describe("Movie Search if input query has a result and fetch are triggered", () => {
  let wrapper;
  beforeEach(done => {
    wrapper = mount(MovieSearchWrapper);
    const input = wrapper.find("input");
    input.element.value = "star";
    input.trigger("input");
    wrapper.vm.$nextTick(() => {
      wrapper.setData({ searchResult: [...search_data] });
      done();
    });
  });
  it("Search results has correct heading", () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
    expect(
      wrapper.find('[data-test="movie-search-query-result-heading"]').text()
    ).toBe('Movies matching: "star"');
  });
  it("movie box item img has a correct src", () => {
    expect(
      wrapper
        .find('[data-test="movie-item-search-box-image"]')
        .attributes("src")
    ).toBe(
      "http://image.tmdb.org/t/p/original//wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg"
    );
  });

  it("movie box item has a correct movie title", () => {
    expect(
      wrapper.find('[data-test="movie-item-search-box-title"]').text()
    ).toBe("A Star Is Born");
  });

  it("there is one result item", () => {
    expect(
      wrapper.findAll('[data-test="movie-item-search-result-item"]')
    ).toHaveLength(1);
  });
});

describe("Movie Search if input query has not result and fetch are triggered", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(MovieSearchWrapper);
    const input = wrapper.find("input");

    input.element.value = "starisborn";
    input.trigger("input");
    wrapper.vm.$nextTick(() => {
      wrapper.setData({ searchResult: [] });
      expect(wrapper.vm.$el).toMatchSnapshot();
    });
  });
  it("Search results has correct heading", () => {
    expect(wrapper.find('[data-test="movie-search-heading"]').text()).toBe(
      "Ooops!"
    );
  });
  it("Search results has correct body", () => {
    expect(wrapper.find('[data-test="movie-search-body"]').text()).toBe(
      "It appears that the movie your are looking for is not available."
    );
  });
  it("there is one result item", () => {
    expect(
      wrapper.findAll('[data-test="movie-item-search-result-item"]')
    ).toHaveLength(0);
  });
});
