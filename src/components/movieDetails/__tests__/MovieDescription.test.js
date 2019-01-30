import { shallowMount} from "@vue/test-utils";
import MovieDescription from "../MovieDescription";
import PercentCircle from "../../svg/PercentCircle";
import Bookmark from "../../svg/Bookmark";
import Favorite from "../../svg/Favorite";

describe("MovieDescription", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(MovieDescription, {
      propsData: {
        movie_details: {
          backdrop_path: "/wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg"
        }
      }
    });
  });

  it("has a PercentCircle", () => {
    expect(wrapper.contains(PercentCircle)).toBe(true);
  });
  it("has a Bookmark button", () => {
    expect(wrapper.contains(Bookmark)).toBe(true);
  });
  it("has a Favorites button", () => {
    expect(wrapper.contains(Favorite)).toBe(true);
  });
  describe("methods", () => {
    it("sliceData returns correct value if argument is not undefined", () => {
      const result = wrapper.vm.sliceDate("2005-04-12");
      expect(result).toBe("2005");
    });
    it("sliceData returns correct value if argument is undefined", () => {
      const result = wrapper.vm.sliceDate(undefined);
      expect(result).toBe("...");
    });
    it("getPosterPath calls generatePosterPath and returns correct value", () => {
      const path = "/wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg";
      const result = wrapper.vm.getPosterPath(path);
      expect(result).toBe(
        "http://image.tmdb.org/t/p/original//wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg"
      );
    });
  });
});
