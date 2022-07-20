import React from 'react';
import {convertLat, convertLng} from "./CoordinateConverter";

export function Text(props) {

    const createText = () => {
        return props.text.map((plan, i) => {
            const x = convertLng(plan.lng, props.width, props.bounds);
            const y = convertLat(plan.lat, props.height, props.bounds);
            return <svg key={i}>
                <text style={plan.style} x={x} y={y}>{plan.text}</text>
            </svg>
        });
    }

    return (
        <svg>
            { createText() }
        </svg>
    )
}
