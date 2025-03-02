import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ProgressRing {
  name: string;
  percentage: number; // 0-100
  color: string;
}

interface ConcentricProgressCirclesProps {
  rings: ProgressRing[];
  width?: number;
  height?: number;
  showLabels?: boolean;
  goalText?: string;
}

const ConcentricProgressCircles: React.FC<ConcentricProgressCirclesProps> = ({
  rings,
  width = 500,
  height = 500,
  showLabels = true,
  goalText = "OF 600 CALS",
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const τ = 2 * Math.PI;
  const gap = 2; // Gap between rings

  useEffect(() => {
    if (!svgRef.current || rings.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous SVG content

    const center = Math.min(width, height) / 2;
    const baseRadius = 135; // Base outer radius
    const ringWidth = 35; // Width of each ring

    // Create the SVG group and center it
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Add shadows for the arcs
    const defs = g.append("defs");

    // Create drop shadow filter
    const filter = defs.append("filter").attr("id", "dropshadow");

    filter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 4)
      .attr("result", "blur");

    filter
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 1)
      .attr("dy", 1)
      .attr("result", "offsetBlur");

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Create gradient for the first ring (if applicable)
    if (rings.length > 0 && rings[0].color === "gradient") {
      const gradient = defs
        .append("linearGradient")
        .attr("id", "ring-gradient")
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "50%")
        .attr("y2", "0%")
        .attr("spreadMethod", "pad");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#fe08b5")
        .attr("stop-opacity", 1);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#ff1410")
        .attr("stop-opacity", 1);
    }

    // Create background arcs (full circles)
    const backgroundArc = d3
      .arc()
      .startAngle(0)
      .endAngle(τ)
      .innerRadius(
        (d: any, i: number) => baseRadius - i * (ringWidth + gap) - ringWidth
      )
      .outerRadius((d: any, i: number) => baseRadius - i * (ringWidth + gap))
      .cornerRadius(20);

    // Create foreground arcs (progress)
    const progressArc = d3
      .arc()
      .startAngle(0)
      .endAngle((d: ProgressRing) => (d.percentage / 100) * τ)
      .innerRadius(
        (d: ProgressRing, i: number) =>
          baseRadius - i * (ringWidth + gap) - ringWidth
      )
      .outerRadius(
        (d: ProgressRing, i: number) => baseRadius - i * (ringWidth + gap)
      )
      .cornerRadius(20);

    // Create field groups for each ring
    const field = g
      .selectAll(".ring-group")
      .data(rings)
      .enter()
      .append("g")
      .attr("class", "ring-group");

    // Add background arcs
    field
      .append("path")
      .attr("class", "background")
      .attr("d", (d, i) => backgroundArc(d, i))
      .style("fill", (d) => d.color)
      .style("opacity", 0.2);

    // Add progress arcs with animation
    const progressPaths = field
      .append("path")
      .attr("class", "progress")
      .attr("filter", "url(#dropshadow)")
      .style("fill", (d, i) => {
        if (i === 0 && d.color === "gradient") {
          return "url(#ring-gradient)";
        }
        return d.color;
      })
      .attr("d", (d, i) => {
        // Start with 0% for animation
        const zeroDatum = { ...d, percentage: 0 };
        return progressArc(zeroDatum, i);
      });

    // Animate the progress paths
    progressPaths
      .transition()
      .duration(1750)
      .delay((d, i) => i * 200)
      .ease(d3.easeCubicOut)
      .attrTween("d", function (d, i) {
        const interpolate = d3.interpolate(0, d.percentage);
        return function (t) {
          const newDatum = { ...d, percentage: interpolate(t) };
          return progressArc(newDatum, i);
        };
      });

    // Add labels if it's a single ring view and labels are requested
    if (showLabels && rings.length === 1) {
      // Goal text
      g.append("text")
        .attr("class", "goal")
        .text(goalText)
        .attr("transform", "translate(0, 50)")
        .style("text-anchor", "middle")
        .style("font-family", "'Roboto', sans-serif")
        .style("font-size", "30px")
        .style("fill", "white");

      // Completed value
      const completed = g
        .append("text")
        .attr("class", "completed")
        .text("0")
        .attr("transform", "translate(0, 0)")
        .style("text-anchor", "middle")
        .style("font-family", "'Roboto', sans-serif")
        .style("font-size", "95px")
        .style("fill", "white");

      // Animate the completed text
      completed
        .transition()
        .duration(1750)
        .tween("text", function () {
          const finalValue = Math.round((rings[0].percentage / 100) * 600);
          const i = d3.interpolateNumber(0, finalValue);
          return function (t) {
            this.textContent = Math.round(i(t)).toString();
          };
        });
    }
  }, [rings, width, height, showLabels, goalText, τ, gap]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ background: "transparent" }}
    />
  );
};

export default ConcentricProgressCircles;
