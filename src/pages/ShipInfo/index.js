import React, { useState } from 'react';
import { SearchShipByKeyWords } from '../../components/SearchShipByKeyWords';
import { Headline } from '../../components/Headline';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchShipsList } from '../../selectors';
import './index.scss';
import { setSearchShipsList } from '../../reducers/ships';

export function ShipInfo() {
    const dispatch = useDispatch()
    const searchShipsList = useSelector(getSearchShipsList);
    const [selectedShipData, setSelectedShipData] = useState(null);

    function shipsListClickHandler(shipData) {
        setSelectedShipData(shipData)
    };

    function resetShipList() {
        setSelectedShipData(null);
        dispatch(setSearchShipsList([]))
    }

    function renderShipsList() {
        return (
            <Row className='justify-content-md-center'>
                <Col xs={10}>
                    <ListGroup>
                        {
                            searchShipsList.map(({ shipId, shipName }) => {
                                return <ListGroup.Item as='li' key={shipId} onClick={() => shipsListClickHandler({ shipId, shipName })}>{ shipName }</ListGroup.Item>
                            })
                        }
                    </ListGroup>
                </Col>
            </Row>
        );
    }

    return (
        <div className='ship-info'>
            <Headline text='Додати інформацію про виявлений корабель'/>
            <SearchShipByKeyWords selectedShipData={selectedShipData} resetShipList={resetShipList}/>
            { !selectedShipData && renderShipsList() }
        </div>
    )
}