import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { newShipFormConfig } from '../../constants/newShipForm';
import { FormField } from '../FormField';
import { useValidation } from '../../hooks/useValidation';
import { useForm } from '../../hooks/useForm';
import { getUnitNames } from '../../selectors';
import { searchShipFormConfig } from '../../constants/shipInfo';
import { postSearchShipKeyWord } from '../../actions/ships';
import { errorSearchShip } from '../../constants/validation';

const initialValues = Object.fromEntries(Object.keys(searchShipFormConfig).map((item) => [item, '']));

export function SearchShipByKeyWords() {

    const dispatch = useDispatch();

    const units = useSelector(getUnitNames);
    const { validationSchema } = useValidation(searchShipFormConfig);
    const { checkIsFormValid, isFormValid } = useForm(searchShipFormConfig);

    const { values, handleChange, handleSubmit, errors, touched, setFieldError } = useFormik({
        initialValues,
        validationSchema,
        initialTouched: { search: true },
        onSubmit: onSubmit
    });

    function onSubmit(payload) {
        dispatch(postSearchShipKeyWord(payload));
    }

    function onFailSearch() {
        setFieldError('search', errorSearchShip);
    }

    function onChange(event) {
        handleChange(event);
        const { target: { value } } = event;
        if (value.length && value.length % 3 === 0) {
            onSubmit({ data: { search: value }, onError: onFailSearch });
        }
    }

    useEffect(() => {
        checkIsFormValid(errors, values);
    }, [values, errors])

    const renderField = ({ name, options, restProps }) => {
        return (
            <FormField 
                key={name}
                onChange={onChange}
                value={values[name]}
                error={errors[name]} 
                touched={touched[name]}
                options={options}
                {...restProps} 
            />
        )
    }

    const renderSearchShipForm = () => {
        return (
            Object.entries(searchShipFormConfig)
                .map(([ name, { options, ...restProps } ]) => {
                    const opts = name === newShipFormConfig.shipUnit.fieldName ? units : options;
                    return renderField({ name, options: opts, restProps })
                })
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Row className='justify-content-md-center'>
                    <Col xs={6}>
                        { renderSearchShipForm() }
                    </Col>
                </Row>
            </form>
        </div>
    )
}