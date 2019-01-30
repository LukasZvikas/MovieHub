import { shallowMount, mount } from "@vue/test-utils";
import SearchHeading from "../SearchHeading";

describe("SearchHeading", () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      heading: "Discover movies here!",
      textBody:
        "Our database stores pretty much every movie ever made. Give it a shot and you will see!"
    };
    wrapper = shallowMount(SearchHeading, {
      propsData: { ...props }
    });
  });

  it("has a correct heading text", () => {
    expect(wrapper.find('[data-test="movie-search-heading"]').text()).toBe(
      props.heading
    );
  });

  it("has a correct textBody text", () => {
    expect(wrapper.find('[data-test="movie-search-body"]').text()).toBe(
      props.textBody
    );
  });

  it("renders content correctly", () => {
    const wrapper = mount(SearchHeading, {
      propsData: { ...props }
    });
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
