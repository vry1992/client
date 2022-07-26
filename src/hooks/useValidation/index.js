import * as yup from 'yup';
import { 
  getUnitNameSchema,
  getCitySchema,
  getCallSignSchema,
  getShipNameSchema,
  getBortNumberSchema,
  getProjectSchema,
  getShipTypeSchema,
  getPelengSchema,
  getSearchSchema,
  getDateSchema,
  getTimeSchema,
  getLatitudeDegsSchema,
  getLatitudeMinsSchema,
  getLongitudeDegsSchema,
  getLongitudeMinsSchema
} from './schemas';

export function useValidation(fieldsToValdate = {}) {
  const validationSchema = yup.object().shape({
    ...( fieldsToValdate.unitName && { unitName: getUnitNameSchema(fieldsToValdate.unitName.required) } ),
    ...( fieldsToValdate.city && { city: getCitySchema(fieldsToValdate.city.required) } ),
    ...( fieldsToValdate.callSign && { callSign: getCallSignSchema(fieldsToValdate.callSign.required) } ),
    ...( fieldsToValdate.shipName && { shipName: getShipNameSchema(fieldsToValdate.shipName.required) } ),
    ...( fieldsToValdate.bortNumber && { bortNumber: getBortNumberSchema(fieldsToValdate.bortNumber.required) } ),
    ...( fieldsToValdate.project && { project: getProjectSchema(fieldsToValdate.project.required) } ),
    ...( fieldsToValdate.shipType && { shipType: getShipTypeSchema(fieldsToValdate.shipType.required) } ),
    ...( fieldsToValdate.peleng && { peleng: getPelengSchema(fieldsToValdate.peleng.required) } ),
    ...( fieldsToValdate.search && { search: getSearchSchema(fieldsToValdate.search.required) } ),
    ...( fieldsToValdate.time && { time: getDateSchema(fieldsToValdate.time.required) } ),
    ...( fieldsToValdate.date && { date: getTimeSchema(fieldsToValdate.date.required) } ),
    ...( fieldsToValdate.latitudeDegs && { latitudeDegs: getLatitudeDegsSchema(fieldsToValdate.latitudeDegs.required) } ),
    ...( fieldsToValdate.latitudeMinutes && { latitudeMinutes: getLatitudeMinsSchema(fieldsToValdate.latitudeMinutes.required) } ),
    ...( fieldsToValdate.longitudeDegs && { longitudeDegs: getLongitudeDegsSchema(fieldsToValdate.longitudeDegs.required) } ),
    ...( fieldsToValdate.longitudeMinutes && { longitudeMinutes: getLongitudeMinsSchema(fieldsToValdate.longitudeMinutes.required) } ),
  });

  return { validationSchema }
}