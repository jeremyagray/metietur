/*
 *  metietur, components for measurement practice
 *
 *  Copyright 2021-2024 Jeremy A Gray <gray@flyquackswim.com>.
 *
 *  All rights reserved.
 *
 *  SPDX-License-Identifier: GPL-3.0-or-later
 */

// React.
import {
  useEffect,
  useRef,
  useState
} from 'react';

// D3.
import * as d3 from 'd3';

/**
 *  From https://gist.github.com/mbostock/3468167
 *
 *  Creates an SVG path approximating a cohesive meniscus.
 *
 *  @param {number} x
 *  @param {number} y
 *  @param {number} width
 *  @param {number} height
 *  @param {number} radius
 */
const cohesive = (x, y, width, height, radius) => {
  return `M${x},${y + height}v${-(height - radius)}a${radius},${radius} 0 0 1 ${radius},${-radius}h${width - 2 * radius}a${radius},${radius} 0 0 1 ${radius},${radius}v${height - radius}Z`;
}

/**
 *  Creates an SVG path approximating a adhesive meniscus.
 *
 *  @param {number} x
 *  @param {number} y
 *  @param {number} width
 *  @param {number} height
 *  @param {number} radius
 */
const adhesive = (x, y, width, height, radius) => {
  return `M${x},${y + height}v${-(height + radius)}a${radius},${radius} 0 0 0 ${radius},${radius}h${width - 2 * radius}a${radius},${radius} 0 0 0 ${radius},${-radius}v${height + radius}Z`;
}

const drawCylinder = (element, config) => {
  const palletteDimensions = {
    width: 800,
    height: 600
  };

  const cylinderDimensions = {
    width: 0.25 * palletteDimensions.width,
    height: 0.8 * palletteDimensions.height,
    x: palletteDimensions.width / 2 - 0.125 * palletteDimensions.width,
    y: (palletteDimensions.height * 0.2) / 2
  };

  const svg = d3
        .select(element)
        .append("svg")
        .attr("id", "measureVisualization")
        .attr("width", palletteDimensions.width)
        .attr("height", palletteDimensions.height);

  const cylinder = svg
        .append("rect")
        .attr("id", "cylinder")
        .attr("height", cylinderDimensions.height)
        .attr("width", cylinderDimensions.width)
        .attr("x", cylinderDimensions.x)
        .attr("y", cylinderDimensions.y)
        .attr("fill", "white")
        .attr("stroke", "#000000");

  const volumeScale = d3
        .scaleLinear()
        .domain([10, 20])
        .range([
          cylinderDimensions.y + cylinderDimensions.height * 0.9,
          cylinderDimensions.y + cylinderDimensions.height * 0.1
        ]);

  const liquidDrawingFunction = config.meniscus === 'adhesive' ? adhesive : cohesive;
  // const liquid = svg
  svg.selectAll(".liquid")
    .data([config.value])
    .enter()
    .append("path")
    .attr("class", "liquid")
    .attr("d", (d, i) => {
      return liquidDrawingFunction(
        cylinderDimensions.x,
        volumeScale(d),
        cylinderDimensions.width,
        cylinderDimensions.height + (palletteDimensions.height * 0.1) - volumeScale(d),
        15
      );
    })
    .attr("fill", "#298ff566");

  const tens = svg
        .selectAll(".tens")
        .data(d3.range(config.minValue, config.maxValue + 1).filter((d) => {
          return d % 10 === 0;
        }))
        .enter()
        .append("line")
        .attr("class", "tens")
        .attr("x1", cylinderDimensions.x)
        .attr("y1", (d, i) => {
          return volumeScale(d);
        })
        .attr("x2", cylinderDimensions.x + cylinderDimensions.width)
        .attr("y2", (d, i) => {
          return volumeScale(d);
        })
        .attr("stroke", "#000000");

  const tensLabels = svg
        .selectAll(".tensLabels")
        .data(d3.range(config.minValue, config.maxValue + 1).filter((d) => {
          return d % 10 === 0;
        }))
        .enter()
        .append("text")
        .attr("class", "tensLabel")
        .attr("text-anchor", "start")
        .style("font-size", "1.5em")
        .style("font-weight", "bold")
        .attr("x", cylinderDimensions.x + cylinderDimensions.width * 0.80)
        .attr("y", (d, i) => {
          return volumeScale(d) - 5;
        })
        .text((d, i) => {
          return d;
        });

  const fives = svg
        .selectAll(".fives")
        .data(d3.range(config.minValue, config.maxValue + 1).filter((d) => {
          return ((d % 5 === 0) && (d % 10 !== 0));
        }))
        .enter()
        .append("line")
        .attr("class", "fives")
        .attr("x1", cylinderDimensions.x)
        .attr("y1", (d, i) => {
          return volumeScale(d);
        })
        .attr("x2", cylinderDimensions.x + cylinderDimensions.width / 2)
        .attr("y2", (d, i) => {
          return volumeScale(d);
        })
        .attr("stroke", "#000000");

  const fivesLabels = svg
        .selectAll(".fivesLabels")
        .data(d3.range(config.minValue, config.maxValue + 1).filter((d) => {
          return ((d % 5 === 0) && (d % 10 !== 0));
        }))
        .enter()
        .append("text")
        .attr("class", "fivesLabel")
        .attr("text-anchor", "start")
        .style("font-size", "1.5em")
        .style("font-weight", "bold")
        .attr("fill", "#ff0000")
        .attr("x", cylinderDimensions.x - 40)
        .attr("y", (d, i) => {
          return volumeScale(d) + 8;
        })
        .text((d, i) => {
          return d;
        });

  const ones = svg
        .selectAll(".ones")
        .data(d3.range(config.minValue, config.maxValue + 1).filter((d) => {
          return ((d % 5 !== 0) && (d % 10 !== 0));
        }))
        .enter()
        .append("line")
        .attr("class", "ones")
        .attr("x1", cylinderDimensions.x)
        .attr("y1", (d, i) => {
          return volumeScale(d);
        })
        .attr("x2", cylinderDimensions.x + cylinderDimensions.width / 4)
        .attr("y2", (d, i) => {
          return volumeScale(d);
        })
        .attr("stroke", "#000000");

  const onesLabels = svg
        .selectAll(".onesLabels")
        .data(d3.range(config.minValue, config.maxValue + 1).filter((d) => {
          return ((d % 5 !== 0) && (d % 10 !== 0));
        }))
        .enter()
        .append("text")
        .attr("class", "onesLabel")
        .attr("text-anchor", "start")
        .style("font-size", "1.5em")
        .style("font-weight", "bold")
        .attr("fill", "#0000ff")
        .attr("x", cylinderDimensions.x - 40)
        .attr("y", (d, i) => {
          return volumeScale(d) + 8;
        })
        .text((d, i) => {
          return d;
        });
};

export const Cylinder = () => {
  return (
    <CylinderSVG />
  );
};

const CylinderSVG = () => {
  // Ref.
  const ref = useRef();
  const [config, setConfig] = useState({
    'value': 17.1,
    'minValue': 10,
    'maxValue': 20,
    'meniscus': 'adhesive'
    // 'meniscus': 'cohesive'
  });

  useEffect(() => {
    drawCylinder(ref.current, config);
    return () => {
      const container = d3.select(ref.current);
      container.selectAll("svg").remove();
    };
  }, [config.value]);

  return (
    <div ref={ref} />
  );
};

export default Cylinder;
