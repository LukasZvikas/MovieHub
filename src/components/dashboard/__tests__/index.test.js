import { mount } from "@vue/test-utils";
import CarouselWrapper from "../";
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

describe("CarouselWrapper", () => {
  let wrapper;
  beforeEach((done) => {
    wrapper = mount(CarouselWrapper);
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        popularMovies: [...search_data],
        comingSoon: [...search_data]
      });
      done();
    });
  });

  it("renders two carousels", () => {
    expect(wrapper.findAll('[data-test="carousel"]')).toHaveLength(2);
  });
  it("renders two movie carousel item", () => {
    expect(wrapper.findAll('[data-test="carousel-item"]')).toHaveLength(2);
  });

  describe("Popular Movies", () => {
    it("carousel has a correct heading", () => {
      expect(wrapper.vm.$el).toMatchSnapshot();
      expect(wrapper.find('[data-test="carousel-1"]').text()).toBe(
        "Popular Movies"
      );
    });

    it("movie carousel item img has a correct src", () => {
      expect(
        wrapper.find('[data-test="carousel-item-img"]').attributes("src")
      ).toBe("http://image.tmdb.org/t/p/w500/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg");
    });
    it("movie carousel item has a correct movie title", () => {
      expect(wrapper.find('[data-test="carousel-item-title"]').text()).toBe(
        "A Star Is Born"
      );
    });
  });
  describe("Coming Soon Movies", () => {
    it("carousel has a correct heading", () => {
      expect(wrapper.find('[data-test="carousel-2"]').text()).toBe(
        "Coming Soon"
      );
    });

    it("movie carousel item img has a correct src", () => {
      expect(
        wrapper.find('[data-test="carousel-item-img"]').attributes("src")
      ).toBe("http://image.tmdb.org/t/p/w500/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg");
    });
    it("movie carousel item has a correct movie title", () => {
      expect(wrapper.find('[data-test="carousel-item-title"]').text()).toBe(
        "A Star Is Born"
      );
    });
  });
});
