/* eslint-env jest */
/* global shallow:false, React:false */

import dummyData from '../dummyData.json';
import Preview from './preview';

const update = dummyData[0];

describe('<Preview />', () => {
  test('it exists', () => {
    const wrapper = shallow(<Preview update={update} />);
    expect(wrapper.exists()).toBe(true);
  });
});
