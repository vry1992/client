import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { FormField } from '../FormField';
import { searchFormFields } from '../../constants/searchForm';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { CustomButton } from '../CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { filterShips } from '../../actions/ships';
import { getDefaultDateFrom, getDefaultDateTo, getSelectOptionsFromArray } from '../../helpers';
import { getShipNamesOptions, getCallSignsOptions, getPersonsWhoAddedOptions, getShipsFilterValues } from '../../selectors';

const initialValues = Object.fromEntries(Object.keys(searchFormFields).map((item) => [item, '']));

export function SearchForm() {
    const { validationSchema } = useValidation(searchFormFields);
    const { checkIsFormValid, isFormValid } = useForm(searchFormFields);
    const shipNamesOptions = useSelector(getShipNamesOptions);
    const callSignsOptions = useSelector(getCallSignsOptions);
    const personsWhoAddedOptions = useSelector(getPersonsWhoAddedOptions);
    const aaa = useSelector(getShipsFilterValues)
    console.log(aaa)
    const [dateFrom, setDateFrom] = useState(getDefaultDateFrom());
    const [timeFrom, setTimeFrom] = useState(null);
    const [dateTo, setDateTo] = useState(getDefaultDateTo());
    const [timeTo, setTimeTo] = useState(null);
    const dispatch = useDispatch();

    const { values, handleSubmit, handleBlur, handleChange, touched, errors, setFieldValue } = useFormik({
        initialValues: Object.fromEntries(Object.keys(searchFormFields).map((item) => [item, aaa[item] || ''])),
        validationSchema,
        onSubmit
    });

    function onSubmit() {
        const {frequency, personNameList, shipNameList, shipCallsignList} = values;
        const dataToSubmit = {
            ...(frequency && { frequency }),
            personNameList: personNameList ? personNameList.map(({ label }) => label) : [],
            shipNameList: shipNameList ? shipNameList.map(({ label }) => label) : [],
            shipCallsignList: shipCallsignList ? shipCallsignList.map(({ label }) => label) : [],
            dateTo: dateTo.dateMS + (timeTo?.timeMS || 0),
            dateFrom: dateFrom.dateMS + (timeFrom?.timeMS || 0),
        };
        dispatch(filterShips({
            data: dataToSubmit,
            onSuccess: () => console.log('success'),
            onError: () => console.log('error'),
        }))
    }

    const getMultyselectOptions = (name) => {
        if (name === searchFormFields.shipNameList.fieldName) return getSelectOptionsFromArray(shipNamesOptions);
        else if (name === searchFormFields.shipCallsignList.fieldName) return getSelectOptionsFromArray(callSignsOptions);
        else if (name === searchFormFields.personNameList.fieldName) return getSelectOptionsFromArray(personsWhoAddedOptions);
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

    function selectMultyple(name, selected) {
        setFieldValue(name, selected)
    }

    const renderSearchForm = () => {
        return (
            Object.entries(searchFormFields)
                .map(([name, props]) => {
                    return renderField({
                        name,
                        onChange: handleChange,
                        ...(props.type === 'time' && { onChange: onChangeTime }),
                        ...(props.type === 'date' && { onChange: onChangeDate }),
                        ...(props.multiple && { selectMultyple }),
                        ...props,
                        options: getMultyselectOptions(name)
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
                    { renderSearchForm() }
                </Row>
                <Row className='justify-content-md-center'>
                    <Col xs={10}>
                        <CustomButton text='Пошук' type='submit' />
                    </Col>
                </Row>

            </form>
        </div>
    );
}