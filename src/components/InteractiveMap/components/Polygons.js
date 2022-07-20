import React from 'react'

import {convertLat, convertLng} from "./CoordinateConverter";

export function Polygons(props) {

    const createPolygons = () => {
        return props.polygons.map((polygon, i) => {
            const fill = polygon.fill;
            const points = polygon.points.map(point => {
                const split = point.split(',');
                const x = convertLng(parseFloat(split[1]), props.width, props.bounds);
                const y = convertLat(parseFloat(split[0]), props.height, props.bounds);
                return x.toString() + ',' + y.toString()
            }).join(" ");
            return <polygon key={i} points={points} fill={fill}/>
        })
    }

    return (
        <svg>
            { createPolygons() }
        </svg>
    )
}

