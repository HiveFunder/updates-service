/* eslint-env browser */
import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import App from './components/app';
import NoData from './components/noData';

const PROJECT_ID = 5;

document.addEventListener('DOMContentLoaded', () => {
  axios.get(`http://localhost:3000/${PROJECT_ID}/updates`).then(response => {
    ReactDom.render(<App updates={response.data} />, document.getElementById('root'));
  })
  .catch(err => {
    console.error(err);
    ReactDom.render(<NoData />, document.getElementById('root'));
  })
});
