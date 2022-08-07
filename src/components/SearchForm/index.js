import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { FormField } from '../FormField';
import { searchFormFields } from '../../constants/searchForm';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { CustomButton } from '../CustomButton';
import { useDispatch } from 'react-redux';
import { filterShips } from '../../actions/ships';
import { getDefaultDateFrom, getDefaultDateTo } from '../../helpers';

const initialValues = Object.fromEntries(Object.keys(searchFormFields).map((item) => [item, '']));

export function SearchForm() {
    const { validationSchema } = useValidation(searchFormFields);
    const { checkIsFormValid, isFormValid } = useForm(searchFormFields);
    const [dateFrom, setDateFrom] = useState(getDefaultDateFrom());
    const [timeFrom, setTimeFrom] = useState(null);
    const [dateTo, setDateTo] = useState(getDefaultDateTo());
    const [timeTo, setTimeTo] = useState(null);
    const dispatch = useDispatch();



    const { values, handleSubmit, handleBlur, handleChange, touched, errors, setFieldValue } = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    function onSubmit() {
        const {frequency, personName, search, shipCallsign} = values;
        const dataToSubmit = {
            ...(frequency && { frequency }),
            ...(personName && { personName }),
            ...(search && { search }),
            ...(shipCallsign && { shipCallsign: shipCallsign.split(', ') }),
            dateTo: dateTo.dateMS + (timeTo?.timeMS || 0),
            dateFrom: dateFrom.dateMS + (timeFrom?.timeMS || 0),
        };
        dispatch(filterShips({
            data: dataToSubmit,
            onSuccess: () => console.log('success'),
            onError: () => console.log('error'),
        }))
    }

    const renderField = ({ name, onChange, columnWidth = 10, ...restProps }) => {
        const date = name === searchFormFields.dateFrom.fieldName ? dateFrom : dateTo;
        const time = name === searchFormFields.timeFrom.fieldName ? timeFrom : timeTo;
        return (
            <Col xs={columnWidth} key={name}>
                <FormField
                    name={name}
                    onChange={onChange}
                    value={values[name]}
                    error={errors[name]}
                    touched={touched[name]}
                    onBlur={handleBlur}
                    date={date}
                    time={time}
                    {...restProps}
                />
            </Col>

        )
    }

    function onChangeTime({ target: { value, valueAsNumber, name } }) {
        if (name === searchFormFields.timeFrom.fieldName) {
            setTimeFrom({ value, timeMS: valueAsNumber });
        }
        else if (name === searchFormFields.timeTo.fieldName) {
            setTimeTo({ value, timeMS: valueAsNumber });
        };
        setFieldValue(name, valueAsNumber);
    };

    function onChangeDate({ target: { valueAsDate, valueAsNumber, name } }) {
        if (name === searchFormFields.dateFrom.fieldName) {
            setDateFrom({
                value: valueAsDate.toLocaleDateString(),
                dateMS: valueAsNumber
            });
        }
        else if (name === searchFormFields.dateTo.fieldName) {
            setDateTo({
                value: valueAsDate.toLocaleDateString(),
                dateMS: valueAsNumber
            });
        };
        setFieldValue(name, valueAsNumber);
    };

    const renderSearchForm = () => {
        return (
            Object.entries(searchFormFields)
                .map(([name, { options, ...restProps }]) => {
                    return renderField({
                        name,
                        onChange: handleChange,
                        ...(restProps.type === 'time' && { onChange: onChangeTime }),
                        ...(restProps.type === 'date' && { onChange: onChangeDate }),
                        ...restProps
                    })
                })
        );
    };

    useEffect(() => {
        checkIsFormValid(errors, values);
    }, [values, errors]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Row className='justify-content-md-center'>
                    {renderSearchForm()}
                </Row>
                <Row className='justify-content-md-center'>
                    <Col xs={10}>
                        <CustomButton text='Пошук' type='submit' disabled={!isFormValid} />
                    </Col>
                </Row>

            </form>
        </div>
    );
}