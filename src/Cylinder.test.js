/*
 *  metietur, components for measurement practice
 *
 *  Copyright 2021-2024 Jeremy A Gray <gray@flyquackswim.com>.
 *
 *  All rights reserved.
 *
 *  SPDX-License-Identifier: GPL-3.0-or-later
 */

// React testing.
import {
  render,
  screen
} from '@testing-library/react';

import '@testing-library/jest-dom';

// Components.
import Cylinder from './Cylinder';

test('renders a graduated cylinder from 10 to 20', async () => {
  render(<Cylinder />);

  let ele = await screen.findByText(/20/i);
  expect(ele).toBeInTheDocument();
  ele = await screen.findByText(/10/i);
  expect(ele).toBeInTheDocument();
});
