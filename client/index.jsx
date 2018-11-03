/* eslint-env browser */
import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import App from './components/app';

const PROJECT_ID = 5;

document.addEventListener('DOMContentLoaded', () => {
  axios.get(`http://localhost:3000/${PROJECT_ID}/updates`).then(response => {
    console.log(response.data);
    ReactDom.render(<App updates={response.data} />, document.getElementById('root'));
  });
});
