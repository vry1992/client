export const newShipFormConfig = {
    shipName: {
        type: 'text',
        placeholder: 'Назва корабля',
        label: 'Назва корабля',
        fieldName: 'shipName',
        required: true
    },
    bortNumber: {
        type: 'text',
        placeholder: 'Бортовий номер',
        label: 'Бортовий номер',
        fieldName: 'bortNumber',
        required: true
    },
    project: {
        type: 'text',
        placeholder: 'Проект',
        label: 'Проект',
        fieldName: 'project',
        required: true
    },
    shipType: {
        type: 'select',
        placeholder: 'Тип',
        label: 'Тип',
        fieldName: 'shipType',
        required: true,
        options: {
            fr: 'Фрегат',
            rk: 'Ракетний корабель',
            rka: 'Ракетний катер',
            pchk: 'Протичовновий корабель',
            tr: 'Тральщик',
            srzk: 'Середній розвідувальний корабель'
        }
    },
    shipUnit: {
        type: 'select',
        placeholder: 'Підрозділ',
        label: 'Підрозділ',
        fieldName: 'shipUnit',
        required: true,
        options: {}
    },
    city: {
        type: 'text',
        placeholder: 'Місто базування',
        label: 'Місто базування',
        fieldName: 'city',
        required: true
    },
}