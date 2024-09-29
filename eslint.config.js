/*
 *  metietur, components for measurement practice
 *
 *  Copyright 2021-2024 Jeremy A Gray <gray@flyquackswim.com>.
 *
 *  All rights reserved.
 *
 *  SPDX-License-Identifier: GPL-3.0-or-later
 */

import js from '@eslint/js';
import * as reactConfigs from 'eslint-plugin-react';
import globals from 'globals';

export default [
  {
    'files': [
      '**/*.js'
    ],
    'plugins': reactConfigs.default.configs.flat.recommended.plugins,
    'rules': {
      ...js.configs.recommended.rules,
      ...reactConfigs.default.configs.flat.recommended.rules,
      ...reactConfigs.default.configs.flat['jsx-runtime'].rules
    },
    'settings': {
      'react': {
        'version': 'detect'
      }
    },
    'languageOptions': {
      'parserOptions': reactConfigs.default.configs.flat['jsx-runtime'].languageOptions.parserOptions,
      'globals': {
        ...globals.browser,
        ...globals.jest,
        ...globals.node
      }
    }
  }
];
