const moment = require('moment');
const PropTypes = require('prop-types');
const React = require('react');
const styles = require('./preview.css');

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
    const dateAndSpacer = [
      <div className={styles.date} key="1">
        {moment(pubDate).format('LL')}
      </div>,
      <div className={styles.spacerContainer} key="2">
        <div className={styles.spacerLine} />
      </div>
    ];

    const styleSide = side === 'left' ? styles.left : styles.right;
    const previewSide = side === 'left' ? styles.previewMainLeft : styles.previewMainRight;

    return (
      <div className={styleSide}>
        <div className={styles.header}>
          {side === 'left' ? dateAndSpacer : dateAndSpacer.reverse()}
        </div>
        <div className={previewSide}>
          <div
            className={highlight ? `${styles.title} ${styles[`highlight${color}`]}` : styles.title}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {title}
          </div>
          <div className={styles.body}>{body.split('</p>')[0]}</div>
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
  update: {}
};

Preview.propTypes = {
  side: PropTypes.string,
  update: PropTypes.shape({
    title: PropTypes.string,
    pubDate: PropTypes.string,
    likes: PropTypes.number
  })
};

module.exports = Preview;

export default Preview;