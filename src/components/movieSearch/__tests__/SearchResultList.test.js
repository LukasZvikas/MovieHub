import { shallowMount } from "@vue/test-utils";
import SearchResultList from "../SearchResultList";

describe("SearchHeading", () => {
  let wrapper;

  it("main div has a correct class if search query is provided", () => {
    wrapper = shallowMount(SearchResultList, {
      propsData: {
        searchQuery: "star",
        searchResult: [{ title: "Star Is Born" }]
      }
    });
    expect(
      wrapper
        .find('[data-test="movie-search-background-image"]')
        .attributes("class")
    ).toBe("movie-list");
  });

  it("main div has a correct class if search query is not provided", () => {
    wrapper = shallowMount(SearchResultList, {
      propsData: {
        searchQuery: "",
        searchResult: []
      }
    });
    expect(
      wrapper
        .find('[data-test="movie-search-background-image"]')
        .attributes("class")
    ).toBe("image back-img-initial");
  });

  it("main div has a correct class if search query is provided but there are no results", () => {
    wrapper = shallowMount(SearchResultList, {
      propsData: {
        searchQuery: "star",
        searchResult: []
      }
    });
    expect(
      wrapper
        .find('[data-test="movie-search-background-image"]')
        .attributes("class")
    ).toBe("image back-img-not-found");
  });
});
