import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateHeader from './dateHeader';
import styles from './preview.css';

function getHighlightColor() {
  const colors = ['Sky', 'Teal', 'Apricot'];
  const randomIdx = Math.floor(Math.random() * colors.length);
  return colors[randomIdx];
}

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.parseHTML = this.parseBodyHTML.bind(this);

    this.state = {
      highlight: false,
      color: getHighlightColor()
    };
  }

  handleMouseEnter() {
    this.setState({ highlight: true });
  }

  handleMouseLeave() {
    this.setState({ highlight: false });
  }

  render() {
    const {
      side,
      update: { title, body, likes, pubDate }
    } = this.props;
    const { highlight, color } = this.state;
    const styleSide = side === 'left' ? styles.left : styles.right;
    const previewSide = side === 'left' ? styles.previewMainLeft : styles.previewMainRight;

    return (
      <div className={styleSide}>
        <DateHeader side={side} pubDate={pubDate} />
        <div className={previewSide}>
          <div
            className={highlight ? `${styles.title} ${styles[`highlight${color}`]}` : styles.title}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {title}
          </div>
          <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
          <div className={side === 'left' ? styles.footerLeft : styles.footerRight}>
            <div className={`${styles.footerElement} ${styles.comments}`}>12 Comments</div>
            <div className={styles.footerElement}>{`${likes} Likes`}</div>
          </div>
        </div>
      </div>
    );
  }
}

Preview.defaultProps = {
  side: 'left',
  update: {
    title: 'No Updates Available',
    pubDate: moment().toISOString(),
    likes: 0,
    body:
      'There are no updates for this project at this time. If you are a contributer, you will recieve an email notification when an update is posted.'
  }
};

Preview.propTypes = {
  side: PropTypes.oneOf(['left', 'right']),
  update: PropTypes.shape({
    title: PropTypes.string,
    pubDate: PropTypes.string,
    likes: PropTypes.number,
    body: PropTypes.string
  })
};

export default Preview;
