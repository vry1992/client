import React from 'react';
import { SearchShipByKeyWords } from '../../components/SearchShipByKeyWords';
import { Headline } from '../../components/Headline';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getSearchShipsList } from '../../selectors';

export function ShipInfo() {

    const searchShipsList = useSelector(getSearchShipsList);

    return (
        <div className='add-new-unit'>
            <Headline text='Додати інформацію про виявлений корабель'/>
            <SearchShipByKeyWords />
            <Row className='justify-content-md-center'>
                <Col xs={6}>
                    <ListGroup>
                        {
                            searchShipsList.map(({ shipId, shipName }) => {
                                return <ListGroup.Item as='li' key={shipId}>{ shipName }</ListGroup.Item>
                            })
                        }
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}