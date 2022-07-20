import React from 'react';
import { Headline } from '../../components/Headline';
import { InteractiveMap } from '../../components/InteractiveMap/Map';

export function Map() {
    return (
        <div className='map'>
            <Headline text='Інтерактивна карта'/>
            <InteractiveMap
                  width={window.innerWidth * 0.8}
                  height={window.innerHeight * 0.85}
                  handleClick={(e) => {
                    // alert(`${e.lat}, ${e.lng}`)
                  }}
                  />
        </div>
    )
}