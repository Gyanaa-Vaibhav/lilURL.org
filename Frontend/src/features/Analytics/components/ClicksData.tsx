// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { useResizeObserver } from "../hooks/useResizeObserver";
import * as d3 from "d3";

type Props = {
    data: { day: string; count: string }[];
};
export function ClicksData({ data }: Props) {
    const svgRef = React.useRef<SVGSVGElement | null>(null);
    const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();

    React.useEffect(()=>{
        if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;

        const margin = { top: 20, right: 20, bottom: 40, left: 50 };
        const innerWidth = dimensions.width - margin.left - margin.right;
        const innerHeight = dimensions.height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const parseTime = d3.isoParse;

        const x = d3.scaleTime()
            .range([0,innerWidth])
            .domain(d3.extent(data,d => parseTime(d.day)))

        const y = d3.scaleLinear()
            .domain([0,d3.max(data,d => d.count)])
            .rangeRound([innerHeight,0])

        const line = d3.line()
            .x(d => x(parseTime(d.day)))
            .y(d => y(d.count))
            .curve(d3.curveMonotoneX);

        svg.append("g");

        g.append("path")
            .datum(data)
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "#27548A")
            .attr("stroke-width", 4)

        g.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(parseTime(d.day)))
            .attr("cy", d => y(d.count))
            .attr("r", 4)
            .attr("fill", "#DDA853")
            .on("mouseover", (_event, d) => {
                d3.select("#tooltip")
                    .style("display", "block")
                    .html(`${d3.timeFormat("%b %d, %I:%M %p")(parseTime(d.day))}: ${d.count}`);
            })
            .on("mousemove", (event) => {
                d3.select("#tooltip")
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", () => {
                d3.select("#tooltip").style("display", "none");
            });

        g.append('g')
            .call(d3.axisLeft(y));

        const xAxis = d3.axisBottom(x)
            .ticks(Math.min(data.length, 10))  // Dynamically limit max ticks
            .tickFormat(d3.timeFormat("%b %d")); // Format like "May 10"

        g.append('g')
            .attr("transform", `translate(0,${innerHeight})`)
            .attr("class", "x-axis")
            .call(xAxis);

        g.selectAll(".tick text")
            .style("fill", "#183B4E")
            .style("font-size", "12px");

        g.selectAll(".domain, .tick line")
            .attr("stroke", "#DDA853");

        g.selectAll(".x-axis text")
            .style("text-anchor", "end")
            .attr("dx", "-0.8em")
            .attr("dy", "0.15em")
            .attr("transform", "rotate(-40)")
            .style("font-size", "12px")
            .style("fill", "#183B4E");


    },[dimensions,data]);

    return (
        <div
            ref={containerRef}
            style={{
                minHeight:"200px",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <svg
                ref={svgRef}
                width={dimensions.width}
                height={dimensions.height}
            />
        </div>
    );
}