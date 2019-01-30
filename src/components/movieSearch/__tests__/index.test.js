import { shallowMount, mount } from "@vue/test-utils";

import MovieSearchWrapper from "../";

jest.mock("../../../utilities/fetch");

const search_data = [
  {
    adult: false,
    backdrop_path: "/wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg",
    id: 332562,
    overview:
      "Seasoned musician Jackson Maine discovers—and falls in love with—struggling artist Ally. She has just about given up on her dream to make it big as a singer—until Jack coaxes her into the spotlight. But even as Ally's career takes off, the personal side of their relationship is breaking down, as Jack fights an ongoing battle with his own internal demons.",
    poster_path: "/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg",
    release_date: "2018-10-03",
    title: "A Star Is Born",
    vote_average: 7.5
  }
];

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
      expect(wrapper.vm.$el).toMatchSnapshot();
    });
  });
  it("Search results has correct heading", () => {
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
