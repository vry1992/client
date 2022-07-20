import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch } from 'react-redux/es/exports';

export function CustiomAccordion({
  items
}) {

  if (!items.length) return null;
  const dispatch = useDispatch();

  return (
    <Accordion defaultActiveKey='0' flush>
      {
        items.map(({ header, content, onClick }, index) => {
          return (
            <Accordion.Item key={index} eventKey={index} onClick={() => dispatch(onClick())}>
              <Accordion.Header>{header}</Accordion.Header>
              <Accordion.Body>{content}</Accordion.Body>
            </Accordion.Item>
            )
        })
      }

  </Accordion>
  )
}