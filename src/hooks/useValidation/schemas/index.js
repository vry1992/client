import * as yup from 'yup';
import { 
  errorFieldMessage,
  unitNameRegexp,
  requiredFieldMessage,
  cityRegexp,
  callSignRegexp,
  shipNameRegexp,
  bortNumberRegexp,
  projectRegexp,
  errorMinPeleng,
  errorMaxPeleng
} from '../../../constants/validation';

const getUnitNameSchema = (required) => {
  const schema = yup
    .string()
    .matches(unitNameRegexp, errorFieldMessage)

  return required ? schema.required(requiredFieldMessage) : schema.notRequired()
}

const getCitySchema = (required) => {
  const schema = yup
    .string()
    .matches(cityRegexp, errorFieldMessage)

  return required ? schema.required(requiredFieldMessage) : schema.notRequired()
}

const getCallSignSchema = (required) => {
  const schema = yup
    .string()
    .matches(callSignRegexp, errorFieldMessage)

  return required ? schema.required(requiredFieldMessage) : schema.notRequired()
}

const getShipNameSchema = (required) => {
  const schema = yup
    .string()
    .matches(shipNameRegexp, errorFieldMessage)

  return required ? schema.required(requiredFieldMessage) : schema.notRequired()
}

const getBortNumberSchema = (required) => {
  const schema = yup
    .string()
    .matches(bortNumberRegexp, errorFieldMessage)

  return required ? schema.required(requiredFieldMessage) : schema.notRequired()
}

const getProjectSchema = (required) => {
  const schema = yup
    .string()
    .matches(projectRegexp, errorFieldMessage)

  return required ? schema.required(requiredFieldMessage) : schema.notRequired()
}

const getShipTypeSchema = (required) => {
  const schema = yup
    .string()

  return required ? schema.required(requiredFieldMessage) : schema.notRequired()
}

const getPelengSchema = (required) => {
  const schema = yup
    .number()
    .min(0, errorMinPeleng)
    .max(360, errorMaxPeleng)

  return required ? schema.required(requiredFieldMessage) : schema.notRequired()
}

const getSearchSchema = (required) => {
  const schema = yup
    .string()

  return required ? schema.required(requiredFieldMessage) : schema.notRequired()
}

export {
  getUnitNameSchema,
  getCitySchema,
  getCallSignSchema,
  getShipNameSchema,
  getBortNumberSchema,
  getProjectSchema,
  getShipTypeSchema,
  getPelengSchema,
  getSearchSchema
}