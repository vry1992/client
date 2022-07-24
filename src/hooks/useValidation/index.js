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
  getSearchSchema
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
  });

  return { validationSchema }
}