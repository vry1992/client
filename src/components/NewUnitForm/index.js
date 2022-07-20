import React, { useEffect } from 'react';
import { useFormik } from 'formik'
import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { newUnitFormConfig } from '../../constants/newUnitForm';
import { FormField } from '../FormField';
import { CustomButton } from '../CustomButton';
import { useValidation } from '../../hooks/useValidation';
import { useForm } from '../../hooks/useForm';
import { MandatoryFieldsNotification } from '../MandatoryFieldsNotification';
import { postUnit } from '../../actions/newUnit';

const initialValues = Object.fromEntries(Object.keys(newUnitFormConfig).map((item) => [item, '']));

export function NewUnitForm() {

    const { validationSchema } = useValidation(newUnitFormConfig);
    const { checkIsFormValid, isFormValid } = useForm(newUnitFormConfig);
    const dispatch = useDispatch();

    const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: onSubmit
    });

    function onSubmit() {
        dispatch(postUnit(values));
    }

    useEffect(() => {
        checkIsFormValid(errors, values);
    }, [values, errors])

    const renderForm = () => {
        return (
            Object.entries(newUnitFormConfig)
                .map(([ name, fieldProps ]) => (
                    <FormField 
                        key={name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[name]}
                        error={errors[name]} 
                        touched={touched[name]}
                        {...fieldProps} 
                    />
                ))
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Row className='justify-content-md-center'>
                    <Col xs={6}>
                        { renderForm() }
                    </Col>
                </Row>
                <Row className='justify-content-md-center'>
                    <Col xs={6}>
                        <MandatoryFieldsNotification />
                        <CustomButton text='Зберегти' type='submit' disabled={!isFormValid}/>
                    </Col>
                </Row>
            </form>
        </div>
    )
}