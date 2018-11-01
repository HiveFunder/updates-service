/* eslint-evn jest */
import App from './app.jsx';
import Preview from './components/preview.jsx';
import dummyData from './dummyData.json';
// import { shallow } from 'enzyme';

describe('<App />', () => {
  test('Renders a <Preview /> component', () => {
    const wrapper = shallow(<App updates={dummyData} />);
    expect(wrapper.find(Preview).length).toBe(3);
  });
});
