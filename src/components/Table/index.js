import React from 'react';
import Table from 'react-bootstrap/Table';
import { unitsTableConfig } from '../../constants/Tables/unitTable';

import { units } from '../../mocks/units';

export function UnitsTable({
  data = units
}) {

  const groupByLevel = () => {
    const grouppedByLevel = data.reduce((acc, curr) => {
      const { level } = curr;
      const alreadyExists = acc[level] || []
      return { ...acc, [level]: [ ...alreadyExists, curr ] }
    }, {});
    const minExistedLevel = Math.min(...Object.keys(grouppedByLevel));
    const result = {};
    Object.entries(grouppedByLevel).forEach(([level, units]) => {
      if (+level === +minExistedLevel) {
        result[level] = units;
        return;
      }
      console.log(units);

    })
  };

  groupByLevel()

  const renderRow = () => {
    return data.map((row, index) => {
      return (
        <tr key={index}>
          { 
            unitsTableConfig.columns
              .map(({ columnName }) => {
                return (
                  <>
                    { columnName === 'order' && <td>{ index + 1 }</td> }
                    { (columnName === 'unitName' || columnName === 'city') && <td>{ row[columnName] }</td> }
                  </>
                )
              })
          }
        </tr>
      )
    })
  }

  return (
    <Table bordered hover>
      <thead>
        <tr>
          { unitsTableConfig.columns.map(({ columnName, label }) =>  <th key={columnName}>{ label }</th> ) }
        </tr>
      </thead>
      <tbody>
        { renderRow() }
        {/* {
          data.map((row) => {
            return 
          })
        } */}
        {/* <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
        </tr> */}
        {/* <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
      </tbody>
    </Table>
  )
}