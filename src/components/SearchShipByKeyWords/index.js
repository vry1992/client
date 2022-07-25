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
import { coordinatesConverter } from '../../helpers';

const initialValues = Object.fromEntries(Object.keys({ ...searchShipFormConfig, ...shipInfoFields }).map((item) => [item, '']));

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
    const [coordinates, setCoordinates] = useState({
        latitudeDegs: 0,
        latitudeMinutes: 0,
        longitudeDegs: 0,
        longitudeMinutes: 0,
    });

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
        const { target: { value } } = event;
        if (!selectedShipData && value.length && value.length % 3 === 0) {
            onSubmit({ data: { search: value }, onError: onFailSearch });
        }
    };

    function onChangeTime({ target: { value, valueAsNumber } }) {
        setTime({ value, timeMS: valueAsNumber });
        setFieldValue('time', valueAsNumber);
    };

    function onChangeDate({ target: { valueAsDate, valueAsNumber } }) {
        setDate({
            value: valueAsDate.toLocaleDateString(),
            dateMS: valueAsNumber
        });
        setFieldValue('date', valueAsNumber);
    };

    function onChangeCoordinates({ target: { name, value } }) {
        setCoordinates({ ...coordinates, [name]: +value })
    }

    useEffect(() => {
        console.log(values);
        checkIsFormValid(errors, values);
    }, [values, errors]);

    useEffect(() => {
        const { 
            latitudeDegs,
            latitudeMinutes,
            longitudeDegs,
            longitudeMinutes
        } = coordinates;
        setFieldValue('longitude', coordinatesConverter(longitudeDegs, longitudeMinutes));
        setFieldValue('latitude', coordinatesConverter(latitudeDegs, latitudeMinutes));
    }, [coordinates, setFieldValue]);

    useEffect(() => {
        selectedShipData && setFieldValue('search', selectedShipData.shipName);
    }, [selectedShipData]);

    const renderField = ({ name, options, date, time, onChange, ...restProps }) => {
        return (
            <FormField 
                key={name}
                onChange={onChange}
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
                    return renderField({ name, options: opts, onChange, ...restProps })
                })
        );
    };

    const renderLatLngFields = (name) => {
        return (
            <Row key={name}>
                { Object.entries(shipInfoFields[name]).map(([fieldName, fieldProps]) => {
                    return (
                        <Col key={fieldName}>
                            { renderField({ name: fieldName, onChange: onChangeCoordinates, ...fieldProps }) }
                        </Col>
                    )
                })}
            </Row>
        )
    }

    const renderShipInfoForm = () => {
        return (
            Object.entries(shipInfoFields)
                .map(([ name, { options, ...restProps } ]) => {
                    const opts = name === newShipFormConfig.shipUnit.fieldName ? units : options;
                    if (name === 'latitude' || name === 'longitude') {
                        return renderLatLngFields(name);
                    }
                    return renderField({ 
                        name, 
                        options: opts,
                        onChange,
                        date,
                        time,
                        ...( name === 'time' && { onChange: onChangeTime }),
                        ...( name === 'date' && { onChange: onChangeDate }),
                        ...restProps 
                    })
                })
        );
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Row className='justify-content-md-center'>
                    <Col xs={6} sm={12}>
                        { renderSearchShipForm() }
                    </Col>
                </Row>
                {
                    selectedShipData && (
                        <Row className='justify-content-md-center'>
                            <Col xs={6} sm={12}>
                                { renderShipInfoForm() }
                            </Col>
                        </Row>
                    )
                }
            </form>
        </div>
    )
}