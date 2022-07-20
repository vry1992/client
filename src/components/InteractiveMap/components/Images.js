import React from 'react';
import {convertLat, convertLng} from "./CoordinateConverter";

export function Images(props) {

    const createImages = () => {
        return props.images.map((plan, i) => {
            const url = plan.url;
            if (plan.isShip) {
                return <image preserveAspectRatio={'none'} key={i} x={plan.lng} y={plan.lat} width={plan.width} height={plan.height} href={url}/>
            }
            const minX = convertLng(plan.topLng, props.width, props.bounds);
            const minY = convertLat(plan.topLat, props.height, props.bounds);
            const maxX = convertLng(plan.bottomLng, props.width, props.bounds);
            const maxY = convertLat(plan.bottomLat, props.height, props.bounds);
            return <image preserveAspectRatio={'none'} key={i} x={minX} y={minY} width={maxX-minX} height={maxY-minY} href={url}/>
        });
    }

    return (
        <svg>
            { createImages() }
        </svg>
    )
}
