import { mount } from "@vue/test-utils";
import CarouselWrapper from "../";
import { search_data } from "../../../utilities/movieMockData";
jest.mock("../../../utilities/fetch");

describe("CarouselWrapper", () => {
  let wrapper;
  beforeEach(done => {
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
