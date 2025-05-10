import React from "react";
import * as d3 from 'd3';
import {useResizeObserver} from "../hooks/useResizeObserver.tsx";

type Props = {
    data: { devicetype: string; count: string }[];
};

export function DevicePie({ data }: Props) {
    const svgRef = React.useRef<SVGSVGElement | null>(null);
    const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();

    React.useEffect(() => {
        if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;
        const deviceColors: Record<string, string> = {
            mobile: "#3DDC84",
            tablet: "#FFB347",
            desktop: "#4A90E2",
            tv: "#9B59B6",
            bot: "#E74C3C",
            others: "#BDC3C7"
        };

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // clear previous chart

        const radius = Math.min(dimensions.width, dimensions.height) / 2;
        // const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie<{ devicetype: string; count: string }>()
            .value(d => Number(d.count));

        const arc = d3.arc<d3.PieArcDatum<{ devicetype: string; count: string }>>()
            .innerRadius(0)
            .outerRadius(radius - 10);

        const g = svg.append("g")
            .attr("transform", `translate(${dimensions.width / 2}, ${dimensions.height / 2})`);

        const arcs = g.selectAll("path")
            .data(pie(data))
            .enter()
            .append("g");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", d => deviceColors[d.data.devicetype.toLowerCase()] || "#CCCCCC")
            .on("mouseover", function (_event, d) {
                d3.select(this)
                    .transition()
                    .duration(150)
                    .attr("transform", "scale(1.1)");

                d3.select("#tooltip")
                    .style("display", "block")
                    .html(`${d.data.devicetype[0].toUpperCase()}${d.data.devicetype.slice(1)}: ${d.value}`);
            })
            .on("mousemove", (event) => {
                d3.select("#tooltip")
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", function () {
                d3.select(this)
                    .transition()
                    .duration(150)
                    .attr("transform", "scale(1)");

                d3.select("#tooltip").style("display", "none");
            })

        arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .text(d => `${d.data.devicetype[0].toUpperCase()}${d.data.devicetype.slice(1)}`)
            .style("font-size", "12px")
            .style("fill", "#000000")
            .style("font-family", "Manrope-Bold, sans-serif")
            .on("mouseover", (_event, d) => {
                d3.select("#tooltip")
                    .style("display", "block")
                    .html(`${d.data.devicetype[0].toUpperCase()}${d.data.devicetype.slice(1)}: ${d.value}`);
            })
            .on("mousemove", (event) => {
                d3.select("#tooltip")
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", () => {
                d3.select("#tooltip").style("display", "none");
            });

    }, [data, dimensions]);

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