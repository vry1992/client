import React from 'react';
import { Headline } from '../../components/Headline';
import { NewShipForm } from '../../components/NewShipForm';

export function AddNewShip() {
    return (
        <div className='add-new-ship'>
            <Headline text='Додати новий корабель'/>
            <NewShipForm />
        </div>
    )
}