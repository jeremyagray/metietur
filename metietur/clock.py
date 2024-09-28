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

"""Clock components."""

import svg


def _hour_hand_angle(hours, minutes, seconds):
    """Calculate the hour hand angle."""
    return (hours * 360 / 12) + (((minutes * 60 + seconds) / 3600) * 30)


def _minute_hand_angle(minutes, seconds):
    """Calculate the minute hand angle."""
    return (minutes * 360 / 60) + ((seconds / 60) * 6)


def _second_hand_angle(seconds):
    """Calculate the second hand angle."""
    return seconds * 360 / 60


class Clock:
    """Represent a clock."""

    def __init__(self, h, m, s):
        """Initialize a clock."""
        self.hours = h
        self.minutes = m
        self.seconds = s

    @classmethod
    def from_timestring(cls, time):
        """Instantiate from a time string.

        Instantiate from a time string, in "HH:MM:SS AM" format.

        Parameters
        ----------
        cls
            The ``Clock`` class.
        time : str
            A time string in "HH:MM:SS AM" format.

        Returns
        -------
        Clock
            An instance of ``Clock``.
        """
        hours = None
        minutes = None
        seconds = None

        return cls(hours, minutes, seconds)


class AnalogClock(Clock):
    """An SVG analog clock."""

    def svg(self):
        """Create an SVG analog clock."""
        canvas = svg.SVG(
            width=100,
            height=100,
        )

        circle = svg.Circle(
            cx=50,
            cy=50,
            r=40,
            stroke="black",
            fill="white",
            stroke_width=2,
        )

        center = svg.Circle(
            cx=50,
            cy=50,
            r=2,
            fill="black",
        )

        minute_hand = svg.Rect(
            x=48,
            y=20,
            width=4,
            height=30,
            fill="black",
            transform=svg.Rotate(
                a=_minute_hand_angle(self.minutes, self.seconds),
                x=50,
                y=50,
            ),
        )

        hour_hand = svg.Rect(
            x=48,
            y=30,
            width=4,
            height=20,
            fill="black",
            transform=svg.Rotate(
                a=_hour_hand_angle(self.hours, self.minutes, self.seconds),
                x=50,
                y=50,
            ),
        )

        second_hand = svg.Rect(
            x=49,
            y=15,
            width=2,
            height=35,
            fill="black",
            transform=svg.Rotate(
                a=_second_hand_angle(self.seconds),
                x=50,
                y=50,
            ),
        )

        canvas.elements = [
            circle,
            center,
            hour_hand,
            minute_hand,
            second_hand,
        ]

        print(canvas)


class DigitalClock(Clock):
    """An SVG digital clock."""

    def svg(self):
        """Create an SVG digital clock."""
        pass


def main():
    """Test clock creation."""
    AnalogClock(6, 23, 15).svg()
