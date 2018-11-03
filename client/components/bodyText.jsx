import React from 'react';
import PropTypes from 'prop-types';
import styles from './bodyText.css';

function htmlParser(text) {
  let paragraphs = [];
  let boldLines = [];
  let italicLines = [];


}

function parseParagraph(text) {
  const idxOfStrong = text.indexOf('<strong>');
  const idxOfEm = text.indexOf('<em>');
  const idxOfP = text.indexOf('<p>');

  if (text.indexOf('<strong>')) {
    return <p className='boldLine'>{text.slice()}</p>
  }
}

function parseLine(text) {
  if ()
}

// function BodyText(props) {

//   return (
//     <div>

//     </div>
//   );
// }
