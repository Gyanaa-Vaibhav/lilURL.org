import React from "react";
import * as d3 from 'd3';
import  '../styles/DevicePie.css'
import {useResizeObserver} from "../hooks/useResizeObserver.tsx";

type Props = {
    data: { devicetype: string; count: string }[];
};

export function DevicePie({ data }: Props) {
    const svgRef = React.useRef<SVGSVGElement | null>(null);
    const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
    const deviceColors = React.useMemo<Record<string, string>>(() => ({
        mobile: "#3DDC84",
        tablet: "#FFB347",
        desktop: "#4A90E2",
        tv: "#9B59B6",
        bot: "#E74C3C",
        others: "#BDC3C7"
    }), []);

    React.useEffect(() => {
        if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // clear previous chart

        const radius = Math.min(dimensions.width, dimensions.height) / 2;
        // const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie<{ devicetype: string; count: string }>()
            .value(d => Number(d.count))
            .padAngle(0.015); // smooth spacing

        const arc = d3.arc<d3.PieArcDatum<{ devicetype: string; count: string }>>()
            .innerRadius(radius * 0.45)
            .outerRadius(radius - 10);

        const g = svg.append("g")
            .attr("transform", `translate(${dimensions.width / 2}, ${dimensions.height / 2})`);

        const arcs = g.selectAll("path")
            .data(pie(data))
            .enter()
            .append("g");

        arcs.append("path")
            .attr("d", arc)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            .attr("fill", d => {
                const base = deviceColors[d.data.devicetype.toLowerCase()] || "#CCCCCC";
                return d3.color(base)?.darker(0.3).toString(); // richer tone
            })
            .attr("stroke", d => deviceColors[d.data.devicetype.toLowerCase()] || "#CCCCCC")
            .attr("stroke-width", 1.5)
            .on("mouseover", function (_event, d) {
                d3.select(this)
                    .transition().duration(150)
                    .attr("stroke-width", 2)
                    .attr("stroke", "#000")
                    .attr("transform", "scale(1.05)");

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
                    .transition().duration(150)
                    .attr("stroke-width", 1)
                    .attr("stroke", "none")
                    .attr("transform", "scale(1)");

                d3.select("#tooltip").style("display", "none");
            })

        arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .text(d => {
                const percent = ((d.value / d3.sum(data.map(d => +d.count))) * 100).toFixed(1);
                return `${percent}%`;
            })
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

    }, [data, deviceColors, dimensions]);

    return (
        <div
            style={{
                // maxWidth: "320px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem", // add spacing between legend and chart
                margin: "0 auto",
                background: "#fff",
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "rgba(0, 0, 0, 0.05) 5px 2px 8px 5px",
            }}
        >
            <div className="chart-legend" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
                {data.map((item, index) => (
                    <div key={index} className="legend-item" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
        <span
            className="legend-color"
            style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: deviceColors[item.devicetype.toLowerCase()] || "#ccc",
                display: "inline-block",
            }}
        />
                        <span style={{ color: "#333", fontWeight: 500 }}>{item.devicetype}</span>
                    </div>
                ))}
            </div>

            <div
                ref={containerRef}
                style={{
                    width: "100%",
                    height: "100%", // important!
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    maxHeight:"fit-content",
                    overflow: "hidden" // stops overflow
                }}
            >
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                        width: "100%",
                        height: "200px",
                        minHeight:"fit-content",
                    }}
                />
            </div>
        </div>
    );
}