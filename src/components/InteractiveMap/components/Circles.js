import React from 'react'
import {convertLat, convertLng} from "./CoordinateConverter";


export function Circles(props) {

    const createCircles = () => {
        return props.circles.map((plan, i) => {
            const cx = convertLng(plan.lng, props.width, props.bounds);
            const cy = convertLat(plan.lat, props.height, props.bounds);
            return <svg key={i}>
                <circle cx={cx} cy={cy} r={plan.r} fill={plan.fill} stroke={'black'} strokeWidth={0.2}/>
            </svg>
        });
    }

    return (
        <svg>
            { createCircles() }
        </svg>
    )
}

