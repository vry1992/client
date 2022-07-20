import { setPelengationPanelState } from "../../reducers/peleng";

export const sidebarLinks = {
    addNewShip: {
        type: 'navigation',
        label: 'Додати новий корабель',
    },
    addNewUnit: {
        type: 'navigation',
        label: 'Додати новий підрозділ',
    },
    map: {
        type: 'navigation',
        label: 'Інтерактивна карта',
    },
    peleng: {
        iconPath: `${process.env.PUBLIC_URL}/images/icons/angle.png`,
        type: 'flowSidebarOpener',
        label: 'Пеленг',
        clickHandler: setPelengationPanelState,
    }
}