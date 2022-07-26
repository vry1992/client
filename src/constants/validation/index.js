export const unitNameRegexp = /[A-Za-zА-Яа-я0-9-]+/;
export const cityRegexp = /[A-Za-zА-Яа-я0-9-]+/;
export const shipNameRegexp = /[А-Яа-я0-9-]+/;
export const bortNumberRegexp = /[A-ZА-Яа-я0-9-]+/;
export const projectRegexp = /[A-ZА-Яа-я0-9-]+/;
export const callSignRegexp = /[A-Za-zА-Яа-я0-9-]+/;
export const dateRegexp = /\d{2}\.\d{2}\.\d{4}/;
export const timeRegexp = /\d{2}:\d{2}/;
export const requiredFieldMessage = 'Обов\'язкове поле';
export const errorFieldMessage = 'Не коректне значення';
export const errorMinPeleng = 'Значення пеленгу не може бути меньше 0';
export const errorMaxPeleng = 'Значення пеленгу не може бути більше 360';
export const errorMinlatDeg = 'Значення не може бути менше -90';
export const errorMaxlatDeg = 'Значення не може бути більше 90';
export const errorMinlatMins = 'Значення не може бути менше 0';
export const errorMaxlatMins = 'Значення не може бути більше 60';

export const errorMinLngDeg = 'Значення не може бути менше 0';
export const errorMaxLngDeg = 'Значення не може бути більше 180';
export const errorMinLngMins = 'Значення не може бути менше 0';
export const errorMaxLngMins = 'Значення не може бути більше 60';

export const errorSearchShip = 'По введеній назві не знайдено жодного корабля. Можливо не вірна назва, або корабель відсутній в базі даних';