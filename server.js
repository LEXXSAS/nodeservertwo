import express from 'express';
import { dirname } from 'path';
import VIteExpress from 'vite-express';

const app = express();

app.use(express.static((dirname, 'dist')));

app.get('/', function (req, res) {
  res.sendFile((dirname, 'dist', 'index.html'));
});

VIteExpress.listen(app, 9000, () => console.log('Server start vite'));

// const express = require('express');
// const path = require('path');
// const app = express();

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.listen(8000);
