import React from 'react';
import PropTypes from 'prop-types';
import styles from './bodyText.css';

// function htmlParser(text) {

//   const bodyText = [];

// }

function parseParagraph(text) {
  let start = '<p>'.length;
  let end;
  let className;

  if (text.indexOf('<strong>') !== -1) {
    start += '<strong>'.length;
    end = text.indexOf('</strong>');
    className = 'boldLine';
  } else if (text.indexOf('<em>') !== -1) {
    start += '<em>'.length;
    end = text.indexOf('</em>');
    className = 'italicLine';
  } else if (text.indexOf('<p>') !== -1) {
    start += '<p>'.length;
    end = text.indexOf('</p>');
    className = 'paragraph';
  }

  return <p className={className}>{text.slice(start, end)}</p>;
}

// function BodyText(props) {

//   return (
//     <div>

//     </div>
//   );
// }
