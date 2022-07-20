import React from 'react';
import {convertLat, convertLng} from "./CoordinateConverter";


export function Polylines(props) {

    const createPaths = () => {
        return props.paths.map((plan, i) => {
            const color = plan.color;
            const path = plan.points.map((point, j) => {
                let ans;
                if (j < plan.points.length-1) {
                    const curr = point.split(",");
                    const next = plan.points[j+1].split(",");
                    ans = <line key={i.toString() + j.toString()}
                                x1={convertLng(parseFloat(curr[1]), props.width, props.bounds)}
                                y1={convertLat(parseFloat(curr[0]), props.height, props.bounds)}
                                x2={convertLng(parseFloat(next[1]), props.width, props.bounds)}
                                y2={convertLat(parseFloat(next[0]), props.height, props.bounds)}
                                style={{stroke: color, strokeWidth: plan.width}} />
                }
                return ans;
            });
            path.pop();
            return path;
        });
    }

    return (
        <svg>
            { createPaths() }
        </svg>
    )
}
