import {useD3} from '../hooks/useD3'
import React from 'react'
import * as d3 from 'd3'

const GraphData = ({data}) => {
    // console.log(data)
    const min = d3.min(data, (d)=>+d.rf_ang)
    const max = d3.max(data, (d)=>+d.rf_ang)
    const minTime = d3.minIndex(data, (d)=>+d.rf_ang)/data[0].framerate
    const maxTime = d3.maxIndex(data, (d)=>+d.rf_ang)/data[0].framerate

    const heightWidth = () => {
        let height = window.innerHeight/7*2;  //200;
        if(height<200){
            height = 200;
        }
        let width = window.innerWidth/8*7;  //350;
        if(width>800){
            width = 800;
        }
        return [height,width]
    }
    // let [height,width] = heightWidth();

    let [height,width] = window.onload = heightWidth();
    // [height,width] = window.onresize = heightWidth();

    // [height,width] = window.onresize();
    // console.log(height)
    // console.log(width)

    const ref = useD3(
        (svg)=>{
            const margin = {top: 15, right: 20, bottom: 35, left: 40}
            // console.log(window)

            const x = d3
            .scaleLinear()
            .domain([0,d3.max(data, (d)=>(d.value_id-data[0].value_id)/data[0].framerate)])
            // .domain(data.map((d)=>(d.value_id-data[0].value_id)/data[0].framerate))
            .rangeRound([margin.left,width - margin.right]);
            // .padding(0.1); //only needed for scaleBand to padd the bars in the chart

            // .scaleLinear() //instead of scaleUtc or scaleBand
            // .domain(d3.extent(data, d => (d.value_id-data[0].value_id)/data[0].framerate))
            // .rangeRound([margin.left, width - margin.right])
            // .padding(0.1);

            const y1 = d3
            .scaleLinear()
            .domain([d3.min(data, (d)=>+d.rf_ang*1.15),d3.max(data, (d)=>+d.rf_ang*1.15)]) //d3.min(data, (d)=>d.rf_ang)
            .rangeRound([height - margin.bottom, margin.top]);

            const line = d3
            .line()
            .defined(d => !isNaN(d.rf_ang))
            .x(d => x((d.value_id-data[0].value_id)/data[0].framerate))
            .y(d => y1(+d.rf_ang));

            const xAxis = (g) =>
            g.attr("transform", `translate(0,${height - margin.bottom})`).call(
                d3
                .axisBottom(x)
                .tickValues(
                    d3
                    .ticks(...d3.extent(x.domain()),width/80)
                    .filter((v)=>x(v)!==undefined)
                )
                .tickSizeOuter(0)
            );

            const y1Axis = (g) =>
                g
                    .attr("transform",`translate(${margin.left},0)`)
                    .style("color","steelblue")
                    .call(d3.axisLeft(y1).ticks(null, "s"))
                    .call((g)=>g.select(".domain").remove())
                    .call((g)=>
                        g
                            .append("text")
                            .attr("x",-margin.left)
                            .attr("y",10)
                            .attr("fill", "currentColor")
                            .attr("text-anchor", "start")
                            .text(data.y1)
                    );
            // svg.select(".x-axis").call(xAxis);
            // svg.select(".y-axis").call(y1Axis);
            
            svg
            .attr("preserveAspectRatio","xMinYMin meet")
            .attr("viewBox","0 0 350 200")
            // .classed("svg-content-responsive",true)
            .append("rect")
            .classed("rect",true)
            .attr("width",350)
            .attr("height",200);
            
            svg.select(".x-axis").call(xAxis);
            svg.select(".y-axis").call(y1Axis);

            svg
            // .select(".plot-area")
            // .attr("fill","mediumturquoise")
            // .selectAll(".bar")
            // .data(data)
            // .join("rect")
            // .attr("class","bar")
            // .attr("x",(d)=>x((d.value_id-data[0].value_id)/data[0].framerate))
            // .attr("width",x.bandwidth())
            // .attr("y",(d)=>y1(d.rf_ang))
            // .attr("height",(d)=>y1(0)-y1(d.rf_ang))

            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "crimson")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);

            svg
            .append("text")
            .attr("class", "xlabel")
            .attr("text-anchor", "middle")
            .attr("x", width/2)
            .attr("y", height-3)
            .text("Time (s)");

            svg
            .append("text")
            .attr("class", "ylabel")
            .attr("text-anchor", "middle")
            .attr("x", -height/2+10)
            .attr("y", 3)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Angle (deg)");

            // d3
            // .select("div#chartId")
            // .append("div")
            // .classed("svg-container",true)
            // .append("svg")
            // .attr("preserveAspectRatio","xMinYMin meet")
            // .attr("viewBox","0 0 350 200")
            // .classed("svg-content-responsive",true)
            // .append("rect")
            // .classed("rect",true)
            // .attr("width",350)
            // .attr("height",200);

        },
        [data.length]
    );


    return(
        <div className="svg-container">
            <svg className="svg-content-responsive"
                ref={ref}
                // style={{
                    // height: height,
                    // width: width,
                    // marginRight: "0px",
                    // marginLeft: "0px",
                // }}
            >
                <g className="plot-area" />
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <div className="graphDetails">
                <p className="detailText">Maximum: {parseFloat(max).toFixed(1)}&#176; at {parseFloat(maxTime).toFixed(2)} seconds</p>
                <p className="detailText">Minimum: {parseFloat(min).toFixed(1)}&#176; at {parseFloat(minTime).toFixed(2)} seconds</p>
            </div>
        </div>
    )
}

export default GraphData