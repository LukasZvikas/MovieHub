import { shallowMount } from "@vue/test-utils";
import CarouselList from "../CarouselList";
import { search_data } from "./testData/data";

describe("CarouselList methods", () => {
  let wrapper;

  wrapper = shallowMount(CarouselList, {
    propsData: {
      movies: search_data,
      title: "Popular Movies",
      caroID: "carousel-2"
    }
  });
  describe("sliceMovieArray", () => {
    it("returns array of length 4 if window size is greater or equal 720", () => {
      wrapper.setData({
        window: {
          width: 720
        }
      });
      global.window.width = 730;
      const result = wrapper.vm.sliceMovieArray(search_data);
      expect(result.length).toBe(5);
    });
    it("returns an array of 10 arrays of length 2 each if window size is lower 720", () => {
      wrapper.setData({
        window: {
          width: 650
        }
      });
      const result = wrapper.vm.sliceMovieArray(search_data);
      result.map(item => {
        expect(item.length).toBe(2);
      });
    });
    it("returns an array of 10 arrays of length 1 each if window size is lower or equal to 540", () => {
      wrapper.setData({
        window: {
          width: 530
        }
      });
      const result = wrapper.vm.sliceMovieArray(search_data);
      result.map(item => {
        expect(item.length).toBe(1);
      });
    });
  });

  describe("columnSetter", () => {
    it("returns 1 if window width is less or equal to 540", () => {
      wrapper.setData({
        window: {
          width: 530
        }
      });
      const result = wrapper.vm.columnSetter();
      expect(result).toBe(1);
    });
    it("returns 1 if window width is less or equal to 540", () => {
      wrapper.setData({
        window: {
          width: 530
        }
      });
      const result = wrapper.vm.columnSetter();
      expect(result).toBe(1);
    });
    it("returns 1 if window width is less or equal to 540", () => {
      wrapper.setData({
        window: {
          width: 530
        }
      });
      const result = wrapper.vm.columnSetter();
      expect(result).toBe(1);
    });
    it("returns 3 if window width is greater or equal to 960", () => {
      wrapper.setData({
        window: {
          width: 970
        }
      });
      const result = wrapper.vm.columnSetter();
      expect(result).toBe(3);
    });
    it("returns 2 if window width is less than 960", () => {
      wrapper.setData({
        window: {
          width: 740
        }
      });
      const result = wrapper.vm.columnSetter();
      expect(result).toBe(2);
    });
    it("returns 4 if window width is greater or equal to 1120", () => {
      wrapper.setData({
        window: {
          width: 1130
        }
      });
      const result = wrapper.vm.columnSetter();
      expect(result).toBe(4);
    });
  });
});
