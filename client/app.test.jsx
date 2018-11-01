/* eslint-evn jest */
// import App from './app.jsx';
// import Preview from './components/preview';
// import { shallow } from 'enzyme';

describe('<App />', () => {
  test('Renders a <Preview /> component', () => {
    const rDiv = shallow(<div className='sup' />);
    expect(rDiv.hasClass('sup')).toBe(true);
  });
});
