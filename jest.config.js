/*
 *  metietur, components for measurement practice
 *
 *  Copyright 2021-2024 Jeremy A Gray <gray@flyquackswim.com>.
 *
 *  All rights reserved.
 *
 *  SPDX-License-Identifier: GPL-3.0-or-later
 */

module.exports = {
  'collectCoverage': true,
  'coverageDirectory': 'coverage',
  'testEnvironment': 'jsdom',
  // The ignore pattern needs an optional '.store' directory since
  // some files will be resolved using the links and some will be the
  // actual files in the pnpm store directory.
  'transformIgnorePatterns': [
    '/node_modules/(?!(.store/d3-?|.store/internmap|.store/delaunator|.store/robust-predicates|d3-?|internmap|delaunator|robust-predicates))'
  ]
};
