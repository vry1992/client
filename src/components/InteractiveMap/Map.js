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
    handleClick
}) {

    const isPelengationPanelReady = useSelector(getIsPelengationPanelReady);
    const pelengsAmount = useSelector(getPelengsAmount);
    const pelengsToDraw = useSelector(getPelengsToDraw);
    const dispatch = useDispatch();

    const mockShips = [
        {
            lat: 44.037433155080215,
            lng: 34.453125,
            url: ship,
            isShip: true
        },
        {
            lat: 42.037433155080215,
            lng: 34.453125,
            url: ship,
            isShip: true
        },
        {
            lat: 45.037433155080215,
            lng: 34.453125,
            url: ship,
            isShip: true
        },
        {
            lat: 41.037433155080215,
            lng: 34.453125,
            url: ship,
            isShip: true
        },
        {
            lat: 46.037433155080215,
            lng: 34.453125,
            url: ship,
            isShip: true
        },
        {
            lat: 46.461215,
            lng: 30.715911,
            url: ship,
            isShip: true
        }
    ]

    const [viewer, setViewer] = useState(null);

    const setMapToCenter = () => {
        viewer.setPointOnViewerCenter(
            convertLng(initialPos.lng, width, bounds),
            convertLat(initialPos.lat, height, bounds),
            initialPos.zoom
        );
    };

    const preventMaxZoomOut = ({ a }) => a < 1 && setMapToCenter();

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
        return mockShips.map((ship) => {
            return {
                url: ship.url, 
                lat: latToPixels(ship.lat, height, bounds) - mapIconSize.width / 2,
                lng: lngToPixels(ship.lng, width, bounds) - mapIconSize.height / 2,
                isShip: ship.isShip,
                width: mapIconSize.width,
                height: mapIconSize.height
            }
        })
    }

    return (
        <div className='map-wpapper'>
            <ReactSVGPanZoom
                width={width} height={height}
                onClick={evt => clicked(evt)}
                detectAutoPan={false}
                ref={Viewer => setViewer(Viewer)}
                onZoom={preventMaxZoomOut}>
                <svg width={width} height={height}>
                    <g>
                        <Images images={[{'url': world2, 'topLat': 90, 'topLng': -180, 'bottomLat': -90, 'bottomLng': 180}]} width={width} height={height} bounds={bounds}  />
                        <Images 
                            images={im()}
                            width={20} 
                            height={20} 
                            bounds={bounds} 
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