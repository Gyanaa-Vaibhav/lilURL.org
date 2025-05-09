import React from "react";
import * as d3 from 'd3';

type Props = {
    data: { os: string; count: string }[];
};

export function OsPie({ data }: Props) {
    console.log(data)
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const svgRef = React.useRef<SVGSVGElement | null>(null);
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

    // Resize observer to update chart size
    React.useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // React.useEffect(()=>{
    //     if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;
    //
    //     const svg = d3.select(svgRef.current);
    //     svg.selectAll("*").remove(); // clear any old junk
    //
    //     const radius = Math.min(dimensions.width, dimensions.height) / 2;
    //
    //     const color = d3.scaleOrdinal(d3.schemeCategory10);
    //
    //
    // })

    React.useEffect(() => {
        if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // clear previous chart

        const radius = Math.min(dimensions.width, dimensions.height) / 2;
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie<{ os: string; count: string }>()
            .value(d => Number(d.count));

        const arc = d3.arc<d3.PieArcDatum<{ os: string; count: string }>>()
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
            .attr("fill", (_, i) => color(i.toString()));

        arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .text(d => `${d.data.os[0].toUpperCase()}${d.data.os.slice(1)}`)
            .style("font-size", "12px")
            .style("fill", "#fff");

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