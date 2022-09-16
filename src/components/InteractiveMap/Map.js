import React, { useEffect, useState } from 'react'
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import {Polylines} from './components/Polylines'
import {Images} from './components/Images.js'
import {Circles} from './components/Circles.js'
import {Polygons} from './components/Polygons.js'
import ship from './images/ship.png'
import { lngToPixels, latToPixels, convertLat, convertLng, reverseLat, reverseLng } from "./components/CoordinateConverter";
import world2 from './images/world2.svg';
import { defaultBounds, defaultInitialPos, mapIconSize } from '../../constants/map';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getIsPelengationPanelReady, getPelengsAmount, getPelengsToDraw } from '../../selectors';
import { addStartPelengPoint } from '../../reducers/peleng';
import { countriesLocalData } from '../../localData/countries';

export function InteractiveMap({
    width,
    height,
    polylines = [],
    circles = [],
    polygons = [],
    initialPos = defaultInitialPos,
    bounds = defaultBounds,
    data,
    handleClick
}) {

    const isPelengationPanelReady = useSelector(getIsPelengationPanelReady);
    const pelengsAmount = useSelector(getPelengsAmount);
    const pelengsToDraw = useSelector(getPelengsToDraw);
    const dispatch = useDispatch();
    const [zoom, setZoom] = useState(1);

    const [viewer, setViewer] = useState(null);

    const setMapToCenter = () => {
        viewer.setPointOnViewerCenter(
            convertLng(initialPos.lng, width, bounds),
            convertLat(initialPos.lat, height, bounds),
            initialPos.zoom
        );
    };

    const preventMaxZoomOut = (zoomValue) => zoomValue < 1 && setMapToCenter();

    const onZoom = ({ a: zoomValue }) => {
        preventMaxZoomOut(zoomValue)
        setZoom(zoomValue);
    }

    useEffect(() => {
        viewer && setMapToCenter();
    }, [viewer, initialPos]);

    const clicked = (event) => {
        const lat = reverseLat(event.y, height, bounds);
        const lng = reverseLng(event.x, width, bounds);
        handleClick({ lat, lng, evt: event.originalEvent });
        if (isPelengationPanelReady) {
            dispatch(addStartPelengPoint({
                id: pelengsAmount,
                latInPx: event.y,
                lngInPx: event.x,
                lat,
                lng,
            }))
        }
    }

    const im = () => {
        console.log(data)
        return data.map((dataItem) => {
            if (!dataItem.latitude || !dataItem.longitude) return null
            return {
                url: ship, 
                lat: latToPixels(dataItem.latitude, height, bounds),
                lng: lngToPixels(dataItem.longitude, width, bounds),
                isShip: true,
                width: mapIconSize.width,
                height: mapIconSize.height,
                ...dataItem
            }
        }).filter(Boolean)
    }
    return (
        <div className='map-wpapper'>
            <ReactSVGPanZoom
                width={width} height={height}
                onClick={evt => clicked(evt)}
                detectAutoPan={false}
                ref={Viewer => setViewer(Viewer)}
                onZoom={onZoom}>
                <svg width={width} height={height}>
                    <g>
                        <Images images={[{'url': world2, 'topLat': 90, 'topLng': -180, 'bottomLat': -90, 'bottomLng': 180}]} width={width} height={height} bounds={bounds}  />
                        <Images 
                            images={im()}
                            width={20} 
                            height={20} 
                            bounds={bounds} 
                            zoom={zoom}
                        />
                        {
                            pelengsToDraw.map((peleng, index) => (
                                <line  
                                    key={index} 
                                    x1={peleng.lngInPx} 
                                    y1={peleng.latInPx} 
                                    y2={-peleng.latInPx}
                                    x2={peleng.lngInPx}
                                    style={{ transformOrigin: `${peleng.lngInPx}px ${peleng.latInPx}px`, transform: `rotate(${peleng.peleng}deg)` }} 
                                    stroke={peleng.color}
                                    strokeWidth={0.2}
                                />
                            ))
                        }
                        {
                            countriesLocalData.map(country => {
                                return (
                                    <text 
                                        key={country.country}
                                        x={lngToPixels(country.lng, width, bounds)}
                                        y={latToPixels(country.lat, height, bounds)}
                                        style={{ fontSize: '1px' }}
                                    >
                                            {country.label}
                                        </text>
                                )
                            })
                        }

                        <Polygons polygons={polygons} width={width} height={height} bounds={bounds}  />
                        <Polylines paths={polylines} width={width} height={height} bounds={bounds} />
                        <Circles circles={circles} width={width} height={height} bounds={bounds}  />
                    </g>
                </svg>
            </ReactSVGPanZoom>
        </div>
    )
}