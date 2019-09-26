import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-testid value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-testid attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-testid='${val}']`);

describe('<App />', () => {
  test('render without error', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
  });

  test('renders increment button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'increment-button');
    expect(button.length).toBe(1);
  });

  test('renders counter display', () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.length).toBe(1);
  });

  test('counter starts at 0', () => {
    const wrapper = setup();
    // /* Test implementation 👎 */
    // const initialCounterState = wrapper.state('counter');
    // expect(initialCounterState).toBe(0);

    /* Test behavior 👍 */
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(0);
  });

  test('clicking increment button increments counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    // find button and click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');

    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1);
  });

  // ==> Add test for decrement button here..

  test(`don't decrement counter if count is zero`, () => {
    const counter = 0;
    const errorText = `Error: Counter can't go below zero!`;
    const wrapper = setup(null, { counter, errorText });
    const button = findByTestAttr(wrapper, 'decrement-button');
    const errorAlert = findByTestAttr(wrapper, 'error-alert');
    button.simulate('click');
    expect(errorAlert.text()).toBe(errorText);
  });

  it('matches snapshot', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});


/*
  test('clicking decrement button decrements counter display', () => {
    const counter = 5;
    const wrapper = setup(null, { counter });
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter - 1);
  });
*/