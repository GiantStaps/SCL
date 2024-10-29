import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function D3Visualization({ data }) {
  const svgRef = useRef();
  const [tooltipData, setTooltipData] = useState(null); // Tooltip data
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 }); // Tooltip position
  const hideTimeoutRef = useRef(null); // Ref to store the hide timeout

  useEffect(() => {
    const svgWidth = 800;
    const svgHeight = 600;
    const margin = { top: 40, right: 30, bottom: 50, left: 50 };

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

    // Calculate the positions for the zero lines
    const xZeroPos = xScale(0); // Position of X=0 on the X-axis
    const yZeroPos = yScale(0); // Position of Y=0 on the Y-axis

    // Bind data to circles
    svg.selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => xScale(d.X))
      .attr('cy', d => yScale(d.Y))
      .attr('r', d => radiusScale(d.Radius))
      .attr('fill', d => colorScale(d.Cluster))
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .on("mouseover", (event, d) => {
        clearTimeout(hideTimeoutRef.current); // Cancel hide timeout
        setTooltipData(d); // Show tooltip
        setTooltipPos({ x: event.pageX, y: event.pageY }); // Position tooltip
      })
      .on("mouseout", () => {
        hideTimeoutRef.current = setTimeout(() => {
          setTooltipData(null); // Hide tooltip
        }, 300); // Delay before hiding tooltip
      });

    // Add X-axis line
    svg.append("line")
      .attr("x1", margin.left)
      .attr("y1", svgHeight - margin.bottom)
      .attr("x2", svgWidth - margin.right)
      .attr("y2", svgHeight - margin.bottom)
      .attr("stroke", "black");

    // Add Y-axis line
    svg.append("line")
      .attr("x1", margin.left)
      .attr("y1", margin.top)
      .attr("x2", margin.left)
      .attr("y2", svgHeight - margin.bottom)
      .attr("stroke", "black");

    // Add dashed line for X=0
    svg.append("line")
      .attr("x1", xZeroPos)
      .attr("y1", margin.top)
      .attr("x2", xZeroPos)
      .attr("y2", svgHeight - margin.bottom)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4,4"); // Dashed line



    // Clear old labels if any
    svg.selectAll(".axis-label").remove();

    // Add X-axis labels (Industry on the left, Research on the right)
    svg.append("text")
      .attr("class", "axis-label")
      .attr("x", margin.left) // Left side of X-axis
      .attr("y", svgHeight - margin.bottom + 35) // Below X-axis
      .attr("text-anchor", "start")
      .style("font-size", "14px")
      .text("Industry");

    svg.append("text")
      .attr("class", "axis-label")
      .attr("x", svgWidth - margin.right) // Right side of X-axis
      .attr("y", svgHeight - margin.bottom + 35) // Below X-axis
      .attr("text-anchor", "end")
      .style("font-size", "14px")
      .text("Research");

    // Add Y-axis labels (Supply Chain at the top, Sustainability at the bottom)
    svg.append("text")
      .attr("class", "axis-label")
      .attr("x", margin.left - 30) // To the left of Y-axis
      .attr("y", margin.top) // Top of Y-axis
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .attr("transform", `rotate(-90, ${margin.left - 30}, ${margin.top})`) // Rotate for vertical text
      .text("Supply Chain");

    svg.append("text")
      .attr("class", "axis-label")
      .attr("x", margin.left - 30) // To the left of Y-axis
      .attr("y", svgHeight - margin.bottom) // Bottom of Y-axis
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .attr("transform", `rotate(-90, ${margin.left - 30}, ${svgHeight - margin.bottom})`) // Rotate for vertical text
      .text("Sustainability");

    // Cleanup timeout when component unmounts
    return () => clearTimeout(hideTimeoutRef.current);

  }, [data]);

  return (
    <div style={{ position: "relative" }}>
      <svg ref={svgRef}></svg>
      {/* Tooltip */}
      {tooltipData && (
        <div
          style={{
            position: "absolute",
            top: tooltipPos.y + 10,
            left: tooltipPos.x + 10,
            backgroundColor: "white",
            border: "1px solid black",
            padding: "10px",
            borderRadius: "5px",
            pointerEvents: "auto",
            width: "200px",
            zIndex: 10
          }}
          onMouseEnter={() => clearTimeout(hideTimeoutRef.current)} // Prevent hiding when hovering over tooltip
          onMouseLeave={() => setTooltipData(null)} // Hide tooltip on mouse leave
        >
          <strong>
            <a href={tooltipData.Website} target="_blank" rel="noopener noreferrer">
              {tooltipData.Entity}
            </a>
          </strong>
          <br />
          Contact:{" "}
          <a href={`mailto:${tooltipData["Contact Email"]}`}>
            {tooltipData.Contact}
          </a>
        </div>
      )}
    </div>
  );
}

export default D3Visualization;