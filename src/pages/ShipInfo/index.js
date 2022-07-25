import React, { useState } from 'react';
import { SearchShipByKeyWords } from '../../components/SearchShipByKeyWords';
import { Headline } from '../../components/Headline';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getSearchShipsList } from '../../selectors';

export function ShipInfo() {

    const searchShipsList = useSelector(getSearchShipsList);
    const [selectedShipData, setSelectedShipData] = useState(null);

    function shipsListClickHandler(shipData) {
        setSelectedShipData(shipData)
    };

    function renderShipsList() {
        return (
            <Row className='justify-content-md-center'>
                <Col xs={6}>
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
        <div className='add-new-unit'>
            <Headline text='Додати інформацію про виявлений корабель'/>
            <SearchShipByKeyWords selectedShipData={selectedShipData} setSelectedShipData={setSelectedShipData}/>
            { !selectedShipData && renderShipsList() }
        </div>
    )
}