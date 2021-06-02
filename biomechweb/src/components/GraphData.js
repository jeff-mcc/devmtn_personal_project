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
        let width = Math.round(window.innerWidth/8*7);  //350;
        if(width>800){
            width = 800;
        }
        // let height = Math.round(window.innerHeight/7*2);  //200;
        let height = width/1.75;
        // if(height<200){
        //     height = 200;
        // }
        // if(height>250){
        //     height = 250;
        // }
        // console.log(height)
        return [height,width]
    }

    let [height,width] = window.onload = heightWidth();
    const origWidth = width;
    // let [newHeight,newWidth] = window.onresize = heightWidth();

    // console.log(window)

    const ref = useD3(
        (svg)=>{
            const margin = {top: 15, right: 20, bottom: 40, left: 45}
            // const margin = {top: 15, right: 20, bottom: 45, left: 50}
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
            g.attr("transform", `translate(0,${height - margin.bottom-2})`)
            // .attr("transform",`scale(${scale*1} ${scale*1})`)
            .call(
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
                    .attr("transform",`translate(${margin.left+2},0)`)
                    .style("color","#543133")
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

            // const xLabel = (g) =>
            //         g
            //         .append("text")
            //         .attr("class", "xlabel")
            //         .attr("text-anchor", "middle")
            //         .attr("x", width/2)
            //         .attr("y", height)
            //         .text("Time (s)");

            svg.select(".x-axis").call(xAxis);
            svg.select(".y-axis").call(y1Axis);
            // svg.select(".xlabel").call(xLabel);
            
            svg
            // .attr("preserveAspectRatio","xMinYMin meet")
            .attr("viewBox",`0 0 ${width} ${height}`)
            //${width} ${height}
            // .classed("svg-content-responsive",true)
            .append("rect")
            .classed("rect",true)
            .attr("width",width)
            .attr("height",height);

            svg
            .append("path")
            .datum(data)
            .attr("class","linePath")
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
            .attr("y", height)
            .text("Time (s)");

            svg
            .append("text")
            .attr("class", "ylabel")
            .attr("text-anchor", "middle")
            .attr("x", -height/2+10)
            .attr("y", 0)
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

            function scaleText(){
                let [height,width] = heightWidth();

                let scale = origWidth/width;

                const margin = {top: 15*scale, right: 20*scale, bottom: 40*scale, left: 45*scale}
                
                x.rangeRound([margin.left,width*scale - margin.right]);
                y1.rangeRound([height*scale - margin.bottom, margin.top]);

                line
                    .x(d => x((d.value_id-data[0].value_id)/data[0].framerate))
                    .y(d => y1(+d.rf_ang));

                // svg.select("svg-content-responsive")
                //     .attr("viewBox",`0 0 ${width*scale} ${height*scale}`)

                // svg.select("rect")
                //     .attr("width",width*scale)
                //     .attr("height",height*scale);

                svg.select(".x-axis")
                    .call(xAxis).attr("font-size",`${scale*0.7}em`)
                    .attr("transform", `translate(0,${height*scale - margin.bottom-2*scale})`)
                    .call(d3.axisBottom(x).tickValues(d3.ticks(...d3.extent(x.domain()),width*scale/80)))
                
                svg.select(".y-axis")
                    .call(y1Axis)
                    .attr("font-size",`${scale*0.7}em`)
                    .attr("transform",`translate(${margin.left+2*scale},0)`)
                    .call((g)=>g.attr("x",-margin.left))
                
                svg.select(".xlabel")
                    .attr("font-size",`${scale*1}em`)
                    .attr("x", width*scale/2)
                    .attr("y", height*scale)
                
                svg.select(".ylabel")
                    .attr("font-size",`${scale*1}em`)
                    .attr("x", -height*scale/2+10)

                d3.select(".linePath").remove();

                svg
                    .append("path")
                    .datum(data)
                    .attr("class","linePath")
                    .attr("fill", "none")
                    .attr("stroke", "crimson")
                    .attr("stroke-width", 1.5*scale)
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr("d", line);
            }
            // window.onresize = svg.select(".x-axis").call(scaleText);
            d3.select(window).on('resize', scaleText);
        },
        [data.length]
    );


    return(
        <div className="svg-container">
            {/* <p className="testLabel" >Angle (deg)</p> */}
            <svg className="svg-content-responsive" ref={ref}>
                {/* <svg className="svg-content-responsive" ref={ref}></svg> */}
                <g className="plot-area" />
                <g className="x-axis" />
                <g className="y-axis" />
                {/* <g className="xlabel" /> */}
            </svg>
            <div className="graphDetails">
                <p className="detailText">Maximum: {parseFloat(max).toFixed(1)}&#176; at {parseFloat(maxTime).toFixed(2)} seconds</p>
                <p className="detailText">Minimum: {parseFloat(min).toFixed(1)}&#176; at {parseFloat(minTime).toFixed(2)} seconds</p>
            </div>
        </div>
    )
}

export default GraphData

                // style={{
                    // height: height,
                    // width: width,
                    // marginRight: "0px",
                    // marginLeft: "0px",
                // }}

                //     .attr("transform",`scale(${scale*1} ${scale*1})`)
                // let scale = origWidth/d3.select("body").node().getBoundingClientRect().width;
                // g.attr("transform",`scale(${scale*0.8})`)