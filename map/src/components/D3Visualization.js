import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function D3Visualization({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const svgWidth = 800;
    const svgHeight = 600;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    const svg = d3.select(svgRef.current)
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .style('background', '#f0f0f0');

    // Define color scale for clusters
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Define X and Y scales based on data extent
    const xExtent = d3.extent(data, d => d.X);
    const yExtent = d3.extent(data, d => d.Y);

    const xScale = d3.scaleLinear()
      .domain(xExtent)
      .range([margin.left, svgWidth - margin.right]);

    const yScale = d3.scaleLinear()
      .domain(yExtent)
      .range([svgHeight - margin.bottom, margin.top]);

    // Define radius scale for dynamic circle sizes
    const radiusExtent = d3.extent(data, d => d.Radius);
    const radiusScale = d3.scaleLinear()
      .domain(radiusExtent)
      .range([3, 15]);

    // Bind data to circles
    svg.selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => xScale(d.X))
      .attr('cy', d => yScale(d.Y))
      .attr('r', d => radiusScale(d.Radius))
      .attr('fill', d => colorScale(d.Cluster))
      .attr('stroke', 'black')
      .attr('stroke-width', 1);

    // Clear old labels if any
    svg.selectAll(".axis-label").remove();

    // Add X-axis labels
    svg.append("text")
      .attr("class", "axis-label")
      .attr("x", margin.left) // Left side of X-axis
      .attr("y", svgHeight - margin.bottom + 35) // Below X-axis
      .attr("text-anchor", "start")
      .style("font-size", "14px")
      .text("Research");

    svg.append("text")
      .attr("class", "axis-label")
      .attr("x", svgWidth - margin.right) // Right side of X-axis
      .attr("y", svgHeight - margin.bottom + 35) // Below X-axis
      .attr("text-anchor", "end")
      .style("font-size", "14px")
      .text("Industry");

    // Add Y-axis labels
    svg.append("text")
      .attr("class", "axis-label")
      .attr("x", margin.left - 30) // To the left of Y-axis
      .attr("y", margin.top) // Top of Y-axis
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .attr("transform", `rotate(-90, ${margin.left - 30}, ${margin.top})`) // Rotate for vertical text
      .text("Sustainability");

    svg.append("text")
      .attr("class", "axis-label")
      .attr("x", margin.left - 30) // To the left of Y-axis
      .attr("y", svgHeight - margin.bottom) // Bottom of Y-axis
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .attr("transform", `rotate(-90, ${margin.left - 30}, ${svgHeight - margin.bottom})`) // Rotate for vertical text
      .text("Supply Chain");

  }, [data]);

  return <svg ref={svgRef}></svg>;
}

export default D3Visualization;