import { shallowMount } from "@vue/test-utils";
import SearchBar from "../SearchBar";
import MagnifyingGlass from "../../../components/svg/MagnifyingGlass";

jest.mock("../../../utilities/fetch");

describe("SearchBar unit", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SearchBar);
  });

  it("has an input", () => {
    expect(wrapper.contains("input")).toBe(true);
  });
  it("has an input", () => {
    expect(wrapper.contains("input")).toBe(true);
  });
  it("has an MagnifyingGlass Icon", () => {
    expect(wrapper.contains(MagnifyingGlass)).toBe(true);
  });
  it("has a correct placeholder", () => {
    expect(wrapper.find("input").attributes("placeholder")).toBe(
      "Search movies"
    );
  });
});
