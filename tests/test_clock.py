# ******************************************************************************
#
# metior, components for measurement practice
#
# Copyright 2021-2024 Jeremy A Gray <gray@flyquackswim.com>.
#
# All rights reserved.
#
# SPDX-License-Identifier: Proprietary
#
# ******************************************************************************

"""Clock component tests."""

import metietur


def test_should_calculate_hour_hand_angle():
    """Should calculate the hour hand angle."""
    actual = metietur._hour_hand_angle(0, 0, 0)
    expected = 0

    assert actual == expected


def test_should_calculate_minute_hand_angle():
    """Should calculate the minute hand angle."""
    actual = metietur._minute_hand_angle(0, 0)
    expected = 0

    assert actual == expected


def test_should_calculate_second_hand_angle():
    """Should calculate the second hand angle."""
    actual = metietur._second_hand_angle(0)
    expected = 0

    assert actual == expected
