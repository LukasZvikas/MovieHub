import { shallowMount, mount } from "@vue/test-utils";

import MovieDetailsWrapper from "../../movieDetails";

import { wrap } from "module";

jest.mock("../../../utilities/fetch");

const cast_data = {
  cast: [
    {
      name: "Bradley Cooper",
      character: "Jackson Maine",
      profile_path: "/z5LUl9bljJnah3S5rtN7rScrmI8.jpg"
    }
  ]
};
const movie_data = {
  movie_details: {
    id: 332562,
    poster_path: "wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg",
    title: "A Star Is Born",
    release_date: "2018-08-24",
    vote_average: 8.4,
    overview:
      "Seasoned musician Jackson Maine discovers—and falls in love with—struggling artist Ally. She has just about given up on her dream to make it big as a singer",
    genres: [{ name: "Drama" }, { name: "Music" }],
    backdrop_path: "/wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg"
  }
};

describe("Movie Details after fetch", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(MovieDetailsWrapper);

    wrapper.vm.$nextTick(() => {
      wrapper.setData({ ...movie_data });
    //   expect(wrapper.vm.$el).toMatchSnapshot();
    });
  });

  it("movie title is correct", () => {
    expect(wrapper.find('[data-test="movie-overview-title"]').text()).toBe(
      "A Star Is Born"
    );
  });

  it("release data is correct", () => {
    expect(
      wrapper.find('[data-test="movie-overview-release-date"]').text()
    ).toBe("(2018)");
  });

  it("vote average is correct", () => {
    expect(wrapper.find('[data-test="movie-overview-average"]').text()).toBe(
      "84%"
    );
  });
  it("overview text is correct", () => {
    expect(wrapper.find('[data-test="movie-overview-body"]').text()).toBe(
      "Seasoned musician Jackson Maine discovers—and falls in love with—struggling artist Ally. She has just about given up on her dream to make it big as a singer"
    );
  });

  it("genre names are correct", () => {
    expect(
      wrapper
        .findAll('[data-test="movie-overview-genre"]')
        .at(0)
        .text()
    ).toBe("Drama");

    expect(
      wrapper
        .findAll('[data-test="movie-overview-genre"]')
        .at(1)
        .text()
    ).toBe("Music");
  });

  it("there are two genre divs", () => {
    expect(wrapper.findAll('[data-test="movie-overview-genre"]')).toHaveLength(
      2
    );
  });
  it("has one movie poster img with the correct path", () => {
    expect(wrapper.findAll("img")).toHaveLength(1);
    expect(wrapper.find("img").attributes("src")).toBe(
      "http://image.tmdb.org/t/p/original/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg"
    );
  });
});

describe("CastList after fetch", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(MovieDetailsWrapper);

    wrapper.vm.$nextTick(() => {
      wrapper.setData({ ...cast_data });
    });
  });

  it("renders one cast member profile", () => {
    expect(
      wrapper.findAll('[data-test="movie-overview-cast-list-item"]')
    ).toHaveLength(1);
  });
  it("has img with the correct path", () => {
    expect(
      wrapper
        .find('[data-test="movie-overview-cast-list-item-img"]')
        .attributes("src")
    ).toBe(
      "http://image.tmdb.org/t/p/original//z5LUl9bljJnah3S5rtN7rScrmI8.jpg"
    );
  });
  it("actor name is correct", () => {
    expect(
      wrapper.find('[data-test="movie-overview-cast-list-item-name"]').text()
    ).toBe("Bradley Cooper");
  });
  it("actor character name is correct", () => {
    expect(
      wrapper
        .find('[data-test="movie-overview-cast-list-item-char-name"]')
        .text()
    ).toBe("Jackson Maine");
  });
});
