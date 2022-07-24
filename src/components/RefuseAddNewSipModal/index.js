import React from 'react';
import { CustomButton } from "../CustomButton";
import { Modal } from "../Modal";
import { Paragraph } from "../Paragraph";

export function RefuseAddNewShipModal(
    {
        show,
        onClick
    }
) {
    return (
        <Modal show={show}>
            <Paragraph text="Спочатку потрібно додати хоча б один підрозділ" />
            <CustomButton onClick={onClick} text='Додати підрозділи' />
        </Modal>
    )
}