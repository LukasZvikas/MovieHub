import { shallowMount, createLocalVue } from "@vue/test-utils";
import TrailerModal from "../TrailerModal";
import MovieModule from "../../../store/modules/movies";

jest.mock("../../../utilities/postFetch");

import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("TrailerModal", () => {
  let store;
  let wrapper;
  let actions;
  let state;
  beforeEach(() => {
    actions = {
      closeTrailer: jest.fn(() => {
        state.isTrailerOpen = false;
      }),
      showTrailer: jest.fn(() => {
        state.isTrailerOpen = false;
      })
    };

    state = {
      isTrailerShown: true
    };

    store = new Vuex.Store({
      modules: {
        MovieModule: {
          state,
          getters: MovieModule.getters
        }
      }
    });

    wrapper = shallowMount(TrailerModal, {
      propsData: {
        trailer_id: "asdasdvve"
      },
      store,
      localVue
    });
  });

  it("main container has a hidden class if TrailerModal is false", () => {
    expect(
      wrapper.find("[data-test='trailer-modal-container']").attributes("class")
    ).toBe("trailer-modal-container d-flex h-100 hidden");
  });

  it("main container has a visible class if TrailerModal is true", () => {
    wrapper.setComputed({ isTrailerShown: true });
    expect(
      wrapper.find("[data-test='trailer-modal-container']").attributes("class")
    ).toBe("trailer-modal-container d-flex h-100 visible");
  });

  it("iframe has a correct src", () => {
    expect(wrapper.find("iframe").attributes("src")).toBe(
      "https://www.youtube.com/embed/asdasdvve?rel=0"
    );
  });
});
