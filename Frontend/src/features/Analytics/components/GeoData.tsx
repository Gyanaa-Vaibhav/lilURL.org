// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import {useResizeObserver} from "../hooks/useResizeObserver.tsx";
import * as d3 from "d3";
import '../styles/GeoData.css'

type Props = {
    data: { location: string; count: string }[];
};
export function GeoData({data}: Props) {
    const svgRef = React.useRef<SVGSVGElement | null>(null);
    const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();

    React.useEffect(() => {
        if(!data.length) return;
        if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const projection = d3.geoNaturalEarth1()
            .scale(dimensions.width / 6)
            .translate([dimensions.width / 2, dimensions.height / 2]);

        const path = d3.geoPath().projection(projection);

        // Aggregate your city-level data
        const countryCounts:Record<string, number> = {};
        for (const d of data) {
            const country = d.location.split(", ").pop();
            if(!country) return;
            countryCounts[country] = (countryCounts[country] || 0) + Number(d.count);
        }

        const colorScale = d3.scaleSequential(d3.interpolateBlues)
            .domain([0, d3.max(Object.values(countryCounts)) || 1]);

        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then((geoData) => {
            svg.append("g")
                .selectAll("path")
                .data(geoData.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", d => {
                    const name = d.properties.name;
                    const count = countryCounts[name] || 0;
                    return count > 0 ? colorScale(count) : "#e0e0e0";
                })
                .attr("stroke", "#fff")
                .on("mouseover", function (_event, d) {
                    d3.select(this)
                        .attr("stroke", "#FFD580")
                        .attr("stroke-width", 1.5);

                    const name = d.properties.name;
                    const count = countryCounts[name] || 0;
                    d3.select("#tooltip")
                        .style("display", "block")
                        .html(`${name}: ${count}`);
                })
                .on("mousemove", (event) => {
                    d3.select("#tooltip")
                        .style("left", event.pageX + 10 + "px")
                        .style("top", event.pageY - 20 + "px");
                })
                .on("mouseout", function () {
                    d3.select(this)
                        .attr("stroke", "#fff")
                        .attr("stroke-width", 0.5);

                    d3.select("#tooltip").style("display", "none");
                });
        });
    }, [data, dimensions]);

    return (
        <div
            id='geo-world'
            ref={containerRef}
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 2px 8px",
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