import React from 'react';
import Form from 'react-bootstrap/Form';
import './index.scss';

export function FormField(fieldProps) {
  const { 
    fieldName,
    type,
    placeholder,
    label,
    onChange,
    onBlur,
    error,
    touched,
    options,
    required,
    ...restProps
  } = fieldProps;

  const renderTextField = () => (
    <Form.FloatingLabel
      label={`${label} ${ required ? '*' : '' }`}
      className='mb-3'
    >
      <Form.Control 
        type={type}
        placeholder={placeholder}
        onChange={onChange} 
        name={fieldName}
        id={fieldName}
        onBlur={onBlur}
        isInvalid={!!error && touched}
        {...restProps}
      />
      { error && touched && (<Form.Control.Feedback type='invalid'>{ error }</Form.Control.Feedback>)}
    </Form.FloatingLabel>
  );

  const renderSelectField = () => (
    <Form.FloatingLabel
      label={`${label} ${ required ? '*' : '' }`}
      className='mb-3'>
        <Form.Select 
          aria-label='Default select example'
          type={type}
          placeholder={placeholder}
          onChange={onChange} 
          name={fieldName}
          id={fieldName}
          onBlur={onBlur}
          isInvalid={!!error && touched}
        >
          <option>Оберіть один із варіантів</option>
          {Object.keys(options).length && Object.entries(options).map(([ value, label ]) => {
            return <option key={value} value={value}>{label}</option>
          })}
        </Form.Select>
      { error && touched && (<Form.Control.Feedback type='invalid'>{ error }</Form.Control.Feedback>)}
    </Form.FloatingLabel>
  );

  const renderColorField = () => (
    <Form.FloatingLabel
      label={`${label} ${ required ? '*' : '' }`}
    >
      <Form.Control 
        type={type}
        placeholder={placeholder}
        onChange={onChange} 
        name={fieldName}
        id={fieldName}
        onBlur={onBlur}
        isInvalid={!!error && touched}
        {...restProps}
      />
    </Form.FloatingLabel>
  );

  const renderCheckboxField = () => {
    return (
      <Form.Group className='mb-3'>
        <Form.Check 
        onChange={onChange} 
        name={fieldName}
        id={fieldName}
        onBlur={onBlur}
        label={label}
         />
      </Form.Group>
    )
  }

  return (
      <React.Fragment key={fieldName}>
          { (type === 'text' || type === 'number') && renderTextField() }
          { type === 'color' && renderColorField() }
          { type === 'select' && renderSelectField() }
          { type === 'checkbox' && renderCheckboxField() }
      </React.Fragment>
  )
}