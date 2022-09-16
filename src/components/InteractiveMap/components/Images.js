import React from 'react';
import { CustomPopover } from '../../CustomPopover';
import {convertLat, convertLng} from "./CoordinateConverter";

export function Images(props) {
    console.log(props)
    const createImages = () => {
        return props.images.map((plan, i) => {
            const url = plan.url;
            if (plan.isShip) {
                const w = plan.width / props.zoom * 30;
                const h = plan.height / props.zoom * 30;
                return (
                    <CustomPopover key={i} {...plan}>
                        <image 
                            preserveAspectRatio={'xMaxYMin'} 
                            key={i} 
                            x={plan.lng + w / 30} 
                            y={plan.lat + h / 30} 
                            width={w < 1.5 ? w : 1.5} 
                            height={h < 1.5 ? h : 1.5} 
                            href={url}
                        />
                    </CustomPopover>
                )
            }
            const minX = convertLng(plan.topLng, props.width, props.bounds);
            const minY = convertLat(plan.topLat, props.height, props.bounds);
            const maxX = convertLng(plan.bottomLng, props.width, props.bounds);
            const maxY = convertLat(plan.bottomLat, props.height, props.bounds);
            return <image key={i} preserveAspectRatio={'none'} x={minX} y={minY} width={maxX-minX} height={maxY-minY} href={url}/>
        });
    }

    return (
        <svg>
            { createImages() }
        </svg>
    )
}
