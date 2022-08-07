import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { newShipFormConfig } from '../../constants/newShipForm';
import { FormField } from '../FormField';
import { CustomButton } from '../CustomButton';
import { useValidation } from '../../hooks/useValidation';
import { useForm } from '../../hooks/useForm';
import { MandatoryFieldsNotification } from '../MandatoryFieldsNotification';
import { getUnitNames } from '../../selectors';
import { postShip } from '../../actions/ships';

const initialValues = Object.fromEntries(Object.keys(newShipFormConfig).map((item) => [item, '']));

export function NewShipForm() {

    const dispatch = useDispatch();

    const unitNames = useSelector(getUnitNames);
    const { validationSchema } = useValidation(newShipFormConfig);
    const { checkIsFormValid, isFormValid } = useForm(newShipFormConfig);

    const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: onSubmit
    });

    function onSubmit() {
        dispatch(postShip(values));
    }

    useEffect(() => {
        checkIsFormValid(errors, values);
    }, [values, errors])

    const renderForm = () => {
        return (
            Object.entries(newShipFormConfig)
                .map(([ name, { options, ...restProps } ]) => {
                    const opts = name === newShipFormConfig.shipUnit.fieldName ? unitNames : options;
                    return (
                        <FormField 
                            key={name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values[name]}
                            error={errors[name]} 
                            touched={touched[name]}
                            options={opts}
                            {...restProps} 
                        />
                    );
                })
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