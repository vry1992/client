import React, { useCallback } from 'react';
import { Headline } from '../../components/Headline';
import { SearchForm } from '../../components/SearchForm';

import Table from 'react-bootstrap/Table';
import { getFilterShipData } from '../../selectors';
import { useSelector } from 'react-redux';

export function Search() {

    // data_id: dataId,
    // edit_timestamp: editTimestamp,
    // fk_ship_data_id: shipId,
    // person_who_edited: personWhoEdited,

    const filterTableConfig = {
        topLine: {
            shipName: {
                text: 'Назва'
            },
            shipType: {
                text: 'Тип'
            },
            shipCity: {
                text: 'Місто дислокації'
            },
            shipCallsign: {
                text: 'Позивний'
            },
            companionCallsign: {
                text: 'Позивний з ким зв\'язувався'
            },
            shipBortNumber: {
                text: 'Бортовий номер'
            },
            peleng: {
                text: 'Пеленг'
            },
            latitude: {
                text: 'Широта'
            },
            longitude: {
                text: 'Довгота'
            },
            frequency: {
                text: 'Частота виявлення'
            },
        },
        secondLine: ['additionalInformation'],
        thirdLine: {
            personsWhoAdded: {
                text: 'Хто добавив:'
            },
            createTimestamp: {
                text: 'Добавлено:'
            }
        },
        fourthLine: {
            personWhoEdited: {
                text: 'Хто відредагував:'
            },
            editTimestamp: {
                text: 'Відредаговано:'
            }
        },
    }

    const filterShipsData = useSelector(getFilterShipData);

    const renderTableBody = useCallback(() => {
        return (
            filterShipsData.map((row, index) => {
                return (
                    <React.Fragment key={index}>
                        <tr>
                            {Object.keys(filterTableConfig.topLine).map((col, idx) => (
                                <td rowSpan={idx === 0 ? 4 : 1} key={`${col}_${index}`}>{row[col]}</td>
                            ))}
                        </tr>
                        <tr>
                            { filterTableConfig.secondLine.map((item) => (
                                <td colSpan={Object.keys(filterTableConfig.topLine).length} key={`${item}_${index}`}>
                                    {row[item] ? row[item] : 'Додаткової інформації немає' }
                                </td>
                            )) }
                        </tr>
                        <tr>
                            { Object.entries(filterTableConfig.thirdLine).map(([key, { text }]) => (
                                <td colSpan={Object.keys(filterTableConfig.topLine).length / Object.keys(filterTableConfig.thirdLine).length} 
                                    key={`${key}_${index}`}>
                                        {text} <i>{row[key]}</i>
                                </td>
                            )) }
                        </tr>
                        <tr>
                            { Object.entries(filterTableConfig.fourthLine).map(([key, { text }]) => (
                                <td colSpan={Object.keys(filterTableConfig.topLine).length / Object.keys(filterTableConfig.fourthLine).length} 
                                    key={`${key}_${index}`}>
                                        {text} {row[key] ? <i>{row[key]}</i> : <i>не редагувалось</i>}
                                </td>
                            )) }
                        </tr>
                    </React.Fragment>

                )
            })
        )
    }, [filterShipsData])

    return (
        <div className='search'>
            <Headline text='Пошук' />
            <SearchForm />

            <Table responsive>
                <thead>
                    <tr>
                        {
                            Object.entries(filterTableConfig.topLine).map(([key, { text }]) => {
                                return <th key={key}>{text}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
            </Table>
        </div>
    )
}