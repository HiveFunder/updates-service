/* eslint-env browser */
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './app.css';
import Preview from './components/preview';

const React = require('react');
const ReactDom = require('react-dom');
// const Preview = require('./components/preview.jsx');

const projectId = 2;
let isLeft = true;

const alternateSide = () => {
  isLeft = !isLeft;
  return isLeft ? 'left' : 'right';
};

function App({ updates }) {
  const updateComponents = updates.reduce((acc, update) => {
    const side = alternateSide();
    const updateOrSpacer = [
      <Preview update={update} side={side} key={update.id} />,
      <div key={`${update.id}spacer`} />
    ];
    acc.push(side === 'left' ? updateOrSpacer.shift() : updateOrSpacer.pop());
    acc.push(updateOrSpacer[0]);
    return acc;
  }, []);

  return (
    <div>
      <div className={styles.verticalMargin} />
      <div className={styles.wrapper}>
        <div className={styles.horizontalMargin} />
        <div className={styles.contentWrapper}>{updateComponents}</div>
        <div className={styles.horizontalMargin} />
      </div>
      <div className={styles.verticalMargin} />
    </div>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  axios.get(`http://localhost:3000/${projectId}/updates`).then(response => {
    ReactDom.render(<App updates={response.data} />, document.getElementById('root'));
  });
});

App.defaultProps = {
  updates: {}
};

App.propTypes = {
  updates: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      pubDate: PropTypes.string,
      likes: PropTypes.number
    })
  )
};

export default App;
