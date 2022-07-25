import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { newShipFormConfig } from '../../constants/newShipForm';
import { FormField } from '../FormField';
import { useValidation } from '../../hooks/useValidation';
import { useForm } from '../../hooks/useForm';
import { getUnitNames } from '../../selectors';
import { searchShipFormConfig, shipInfoFields } from '../../constants/shipInfo';
import { postSearchShipKeyWord } from '../../actions/ships';
import { errorSearchShip } from '../../constants/validation';

const initialValues = Object.fromEntries(Object.keys(searchShipFormConfig).map((item) => [item, '']));

export function SearchShipByKeyWords({
    selectedShipData,
    setSelectedShipData
}) {

    const dispatch = useDispatch();

    const units = useSelector(getUnitNames);
    const { validationSchema } = useValidation(searchShipFormConfig);
    const { checkIsFormValid, isFormValid } = useForm(searchShipFormConfig);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    const { values, handleChange, handleSubmit, errors, touched, setFieldError, setFieldValue } = useFormik({
        initialValues,
        validationSchema,
        initialTouched: { search: true },
        onSubmit: onSubmit
    });

    function onSubmit(payload) {
        dispatch(postSearchShipKeyWord(payload));
    };

    function onFailSearch() {
        setFieldError('search', errorSearchShip);
    };

    function onChange(event) {
        handleChange(event);
        setSelectedShipData(null);
        const { target: { value } } = event;
        if (value.length && value.length % 3 === 0) {
            onSubmit({ data: { search: value }, onError: onFailSearch });
        }
    };

    function onChangeTime({ target: { value, valueAsNumber } }) {
        setTime({ value, timeMS: valueAsNumber });
    };

    function onChangeDate({ target: { valueAsDate, valueAsNumber } }) {
        setDate({
            value: valueAsDate.toLocaleDateString(),
            dateMS: valueAsNumber
        })
    };

    useEffect(() => {
        checkIsFormValid(errors, values);
    }, [values, errors]);

    useEffect(() => {
        selectedShipData && setFieldValue('search', selectedShipData.shipName);
    }, [selectedShipData]);

    const renderField = ({ name, options, onChangeDate, onChangeTime, date, time, ...restProps }) => {
        const changeHandler = name === shipInfoFields.time.fieldName 
            ? onChangeTime : name === shipInfoFields.date.fieldName
            ? onChangeDate : onChange;
        return (
            <FormField 
                key={name}
                onChange={changeHandler}
                value={values[name]}
                error={errors[name]} 
                touched={touched[name]}
                options={options}
                date={date}
                time={time}
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
    };

    const renderShipInfoForm = () => {
        return (
            Object.entries(shipInfoFields)
                .map(([ name, { options, ...restProps } ]) => {
                    const opts = name === newShipFormConfig.shipUnit.fieldName ? units : options;
                    if (name === 'latitude' || name === 'longitude') {
                        return (
                            <Row key={name}>
                                { Object.entries(shipInfoFields[name]).map(([fieldName, fieldProps]) => {
                                    return (
                                        <Col key={fieldName}>
                                            { renderField({ name: fieldName, ...fieldProps }) }
                                        </Col>
                                    )
                                })}
                            </Row>
                        )
                    }
                    return renderField({ name, options: opts, restProps, onChangeDate, onChangeTime, date, time })
                })
        );
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Row className='justify-content-md-center'>
                    <Col xs={6}>
                        { renderSearchShipForm() }
                    </Col>
                </Row>
                {
                    selectedShipData && (
                        <Row className='justify-content-md-center'>
                            <Col xs={6}>
                                { renderShipInfoForm() }
                            </Col>
                        </Row>
                    )
                }
            </form>
        </div>
    )
}