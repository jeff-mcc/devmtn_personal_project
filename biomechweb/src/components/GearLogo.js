import {useD3} from '../hooks/useD3'
import React from 'react'
// import * as d3 from 'd3'

const GearLogo = () => {
    const ref = useD3(
        (svg)=>{
            // let angle = 0;
            // let frameAngle = 0;

            const toothRadius = 1.5;
            const holeRadius = 4;
            // const speed = 0.08;

            const gears = [
                {fill: "#9B2E45", teeth: 12, radius: 18, origin: [-26.5,-22.5]},
                {fill: "#8C544C", teeth: 10, radius: 15, origin: [0,0]} 
            ]

            function gear({teeth,radius,annulus}) {
                const n = teeth;
                let r2 = Math.abs(radius);
                let r0 = r2 - toothRadius;
                let r1 = r2 + toothRadius;
                let r3 = holeRadius;
                if (annulus) {
                    r3 = r0
                    r0 = r1
                    r1 = r3
                    r3 = r2 + toothRadius * 3
                }
                const da = Math.PI / n;
                let a0 = -Math.PI / 2 + (annulus ? Math.PI / n : 0);
                const path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
                let i = -1;
                while (++i < n) {
                    path.push(
                        "A", r0, ",", r0, " 0 0,1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0),
                        "L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0),
                        "L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
                        "A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
                        "L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0),
                        "L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)
                    );
                }
                path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
                return path.join("");
            }

            // const graphic = () => {
                // const svgCreate = () => d3.create("svg")
                svg
                .attr("viewBox", [ -46, -53, 63, 80])
                .attr("stroke", "#B58981")
                .attr("stroke-width", 1) // 1/640
                // .style("max-width", "110px")
                .style("display", "block")
                .style("margin", "auto");

                const frame = svg.append("g");

                // const path = 
                frame.selectAll("path")
                    .data(gears)
                    .join("path")
                        .attr("fill",d=>d.fill)
                        .attr("d",gear)
                        .attr("transform", d => `translate(${d.origin})`);

                // const update = async () => {
                    // while (true) {
                        // angle += speed;
                        // await path.attr("transform", d => `rotate(${(angle / d.radius) % 360})`)
                    // }
                    // console.log(angle)
                // }
                // update()

                // const graphic = () => {
                //     return Object.assign(svg.node(),{update(angle,frameAngle){
                //         path.attr("transform", d => `translate(${d.origin}) rotate(${(angle / d.radius) % 360})`);
                //         frame.attr("transform", `rotate(${frameAngle % 360})`);
                //     }});
                // }
                // graphic()
                // console.log(graphic())
                // rotate(${(angle / d.radius) % 360})

                // return Object.assign(svg.node(),{
                //     update(angle,frameAngle){
                //         path.attr("transform", d => `translate(${d.origin}) rotate(${(angle / d.radius) % 360})`);
                //         frame.attr("transform", `rotate(${frameAngle % 360})`);
                //     }
                // });
            // }
            // graphic()

            // let update = undefined;
            // const update = async () => {
            //     // while (true) {
            //     await graphic.update(
            //         angle += speed,
            //         frameAngle += speed/-0.1
            //     );
            // }
            // update()

            // svg.select("svg-logo").call(svgCreate)
        }
    ,[])

    return(
        <div className="logo-container">
            <svg className="svg-logo" ref={ref}>
            </svg>
        </div>
    )
}

export default GearLogo