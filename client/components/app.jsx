/* eslint-env browser */
import React from 'react';
import axios from 'axios';
import styles from './app.css';
import Preview from './preview';

/* eslint-disable */
const HOST_URL = process.env.HOST_URL || 'http://13.57.28.73';
const HOST_PORT = process.env.HOST_PORT || 80;
let isLeft = true;
/* eslint-enable */

const alternateSide = () => {
  isLeft = !isLeft;
  return isLeft ? 'left' : 'right';
};

class App extends React.Component {
  constructor() {
    super();
    this.state = { updates: null };
    this.createAlternatingUpdates = this.createAlternatingUpdates.bind(this);
  }

  componentDidMount() {
    const splitURL = window.location.href.split('/');
    const projectId = Number(splitURL[splitURL.length - 2]) || 7;
    // console.log(projectId, splitURL)
    axios
      .get(`${HOST_URL}:${HOST_PORT}/api/${projectId}/updates`)
      .then(updates => {
        // console.log('message>>>>>>>>>>>>>>>>>>>>>', updates)
        this.setState({ updates: updates.data.rows });
      })
      .catch(err => console.log(err));
  }

  createAlternatingUpdates() {
    const { updates } = this.state;
    const updateComponents = updates.reduce((acc, update) => {
      const side = alternateSide();
      const preview = <Preview update={update} side={side} key={update.id} />;
      const spacer = <div key={`${update.id}spacer`} />;

      if (side === 'left') {
        acc.push(preview);
        acc.push(spacer);
      } else {
        acc.push(spacer);
        acc.push(preview);
      }
      return acc;
    }, []);
    return updateComponents;
  }

  render() {
    const { updates } = this.state;
    return (
      <div>
        <div className={styles.verticalMargin} />
        <div className={styles.wrapper}>
          <div />
          <div className={styles.contentWrapper}>
            {updates ? this.createAlternatingUpdates() : <h1>Loading Updates...</h1>}
          </div>
          <div />
        </div>
        <div className={styles.verticalMargin} />
      </div>
    );
  }
}

export default App;
