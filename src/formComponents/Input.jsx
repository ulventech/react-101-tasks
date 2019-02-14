import React from 'react';
import { Input } from 'reactstrap';

const renderField = ({
  input,
  placeholder,
  meta: { touched, error, warning },
}) => (
  <Input
    {...input}
    placeholder={placeholder}
    invalid={(touched && error) ? true : false}
  />
);

export default renderField;
