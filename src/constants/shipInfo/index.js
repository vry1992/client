export const searchShipFormConfig = {
    search: {
        type: 'text',
        placeholder: 'Введіть назву корабля',
        label: 'Введіть назву корабля',
        fieldName: 'search',
        required: true
    },
}

export const shipInfoFields = {
    date: {
        type: 'date',
        placeholder: 'Виберіть дату',
        label: 'Виберіть дату',
        fieldName: 'date',
        required: true
    },
    time: {
        type: 'time',
        placeholder: 'Виберіть час',
        label: 'Виберіть час',
        fieldName: 'time',
        required: true
    },
    peleng: {
        type: 'number',
        placeholder: 'Введіть пеленг від 0 до 360',
        label: 'Пеленг',
        fieldName: 'peleng',
        required: true,
        min: 0,
        max: 360
    },
    latitude: {
        latitudeDegs: {
            type: 'number',
            placeholder: 'Введіть градуси північної широти',
            label: 'Градуси північної широти',
            fieldName: 'latitudeDegs',
            required: false,
            min: -90,
            max: 90
        },
        latitudeMinutes: {
            type: 'number',
            placeholder: 'Введіть мінути північної широти',
            label: 'Мінуті північної широти',
            fieldName: 'latitudeMinutes',
            required: false,
            min: 0,
            max: 60
        },
    },
    longitude: {
        longitudeDegs: {
            type: 'number',
            placeholder: 'Введіть градуси східної довготи',
            label: 'Градуси східної довготи',
            fieldName: 'latitudeDegs',
            required: false,
            min: 0,
            max: 180
        },
        longitudeMinutes: {
            type: 'number',
            placeholder: 'Введіть мінути східної довготи',
            label: 'Мінути східної довготи',
            fieldName: 'latitudeMinutes',
            required: false,
            min: 0,
            max: 60
        },
    }
};
