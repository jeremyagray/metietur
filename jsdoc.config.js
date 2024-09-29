/*
 *  metietur, components for measurement practice
 *
 *  Copyright 2021-2024 Jeremy A Gray <gray@flyquackswim.com>.
 *
 *  All rights reserved.
 *
 *  SPDX-License-Identifier: GPL-3.0-or-later
 */

'use strict';

module.exports = {
  'source': {
    'includePattern': '.+\\.[jt]sx?$',
    'include': ['src']
  },
  'opts': {
    'destination': 'docs',
    'recurse': true
  }
}
