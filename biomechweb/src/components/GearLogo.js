import {useD3} from '../hooks/useD3'
import React from 'react'
import * as d3 from 'd3'
import { IoSpeedometer } from 'react-icons/io5'

const GearLogo = ({data}) => {
    const ref = useD3(
        (svg)=>{
            const graphic = () => {
                svg
                .attr("viewBox", [-0.53, -0.53, 1.06, 1.06])
                .attr("stroke", "black")
                .attr("stroke-width", 1 / 640)
                .style("max-width", "100px")
                .style("display", "block")
                .style("margin", "auto");

                const frame = svg.append("g");

                const path = frame.selectAll("path")
                    .data(gears)
                    .join("path")
                        .attr("fill",d=>d.fill)
                        .attr("d",gear);

                return Object.assign(svg.node(),{
                    update(angle,frameAngle){
                        path.attr("transform",d=>`translate(${d.origin}) rotate(${frameAngle % 360})`);
                    }
                });
            }

            let angle = 0;

            let frameAngle = 0;

            let update = undefined;
            update = () => {
                while(true) {
                    yield graphic.update(
                        angle += speed,
                        frameAngle += speed/frameRadius
                    );
                }
            }

            const gears = [
                {fill: "#6baed6", teeth: 24, radius: +0.1, origin: [0,0]},
                {fill: "#9ecae1", teeth: 32, radius: -0.133, origin: [-0.233,-0.233]}
            ]

            const toothRadius = 0.008;
            const holeRadius = 0.02;
            const speed = 0.08;

            function gear({teeth,radius}) {
                const n = teeth;
                let r2 = Math.abs(radius);
                let r0 = r2 - toothRadius;
                let r1 = r2 + toothRadius;
                let r3 = holeRadius;
            }
        }
    ,[])

    return(
        <div className="logo-container">
            <svg className="svg-logo">
            </svg>
        </div>
    )
}

export default GearLogo