/*
 *  metietur, components for measurement practice
 *
 *  Copyright 2021-2024 Jeremy A Gray <gray@flyquackswim.com>.
 *
 *  All rights reserved.
 *
 *  SPDX-License-Identifier: GPL-3.0-or-later
 */

const path = require('path');

module.exports = {
  'devServer': {
    'historyApiFallback': true,
    'static': {
      'directory': path.join(__dirname, 'public')
    },
    'compress': true,
    'open': false,
    'port': 3003
  },
  'devtool': 'source-map',
  'entry': {
    'index': path.resolve(__dirname, 'src', 'index.js')
  },
  'mode': 'development',
  'module': {
    'rules': [
      {
        'test': /\.jsx?$/,
        'exclude': /node_modules/,
        'use': {
          'loader': 'babel-loader'
        }
      },
      {
        'test': /\.jsx?$/,
        'enforce': 'pre',
        'use': [
          'source-map-loader'
        ]
      }
    ]
  },
  'output': {
    'publicPath': '/',
    'path': path.resolve(__dirname, 'dist'),
    'filename': 'bundle.js'
  },
  'resolveLoader': {
    modules: [
      'node_modules'
    ]
  }
};
