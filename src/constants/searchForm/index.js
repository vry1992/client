export const searchFormFields = {
    dateFrom: {
        type: 'date',
        placeholder: 'Дата від якої почати пошук',
        label: 'Дата від якої почати пошук',
        fieldName: 'dateFrom',
        columnWidth: 5
    },
    timeFrom: {
        type: 'time',
        placeholder: 'Час від якого починати пошук',
        label: 'Час від якого починати пошук',
        fieldName: 'timeFrom',
        columnWidth: 5
    },
    dateTo: {
        type: 'date',
        placeholder: 'Дата до якої здійснювати пошук',
        label: 'Дата до якої здійснювати пошук',
        fieldName: 'dateTo',
        columnWidth: 5
    },
    timeTo: {
        type: 'time',
        placeholder: 'Час до якого здійснювати пошук',
        label: 'Час до якого здійснювати пошук',
        fieldName: 'timeTo',
        columnWidth: 5
    },
    search: {
        type: 'text',
        placeholder: 'Введіть назву корабля',
        label: 'Введіть назву корабля',
        fieldName: 'search',
        autoComplete: 'off',
        columnWidth: 5
    },
    frequency: {
        type: 'text',
        placeholder: 'Частота на якій спостерігалось, наприклад 0000 або 123.456',
        label: 'Частота на якій спостерігалось, наприклад 0000 або 123.456',
        fieldName: 'frequency',
        columnWidth: 5
    },
    shipCallsign: {
        type: 'text',
        placeholder: 'Позивні через кому, наприклад: Позивний1, позивний2, позивний3',
        label: 'Позивні через кому, наприклад: Позивний1, позивний2, позивний3',
        fieldName: 'shipCallsign',
        columnWidth: 5
    },
    personName: {
        type: 'text',
        placeholder: 'Прізвище та ініціали того хто добавив запис',
        label: 'Прізвище та ініціали того хто добавив запис',
        fieldName: 'personName',
        columnWidth: 5
    },
};
