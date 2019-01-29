import { shallowMount, mount } from "@vue/test-utils";

import MovieDetailsWrapper from "../../movieDetails";

jest.mock("../../../utilities/fetch");

describe("SearchBar integration", () => {
  it("calls fetch", done => {
    const wrapper = mount(MovieDetailsWrapper);

    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        movie_details: {
          id: 332562,
          poster_path: "wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg",
          title: "A Star Is Born",
          release_date: "2018-08-24"
        }
      });
      expect(wrapper.find('[data-test="movie-overview-title"]').text()).toBe(
        "A Star Is Born"
      );
      expect(
        wrapper.find('[data-test="movie-overview-release-date"]').text()
      ).toBe("(2018)");

      expect(wrapper.vm.$el).toMatchSnapshot();
      done();
    });
  });
});
