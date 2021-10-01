import React from 'react';
import {
    Input
} from 'native-base';
import FieldWrapperForm from '../FieldWrapperForm';

const InputForm = ({ formikProps, formikKey, label, placeholder, ...rest }) => {
    return (
        <FieldWrapperForm formikProps={formikProps} formikKey={formikKey} label={label}>
            <Input
                placeholder={placeholder ? placeholder : label}
                value={formikProps.values[formikKey]}
                onChangeText={formikProps.handleChange(formikKey)}
                onBlur={formikProps.handleBlur(formikKey)}
                {...rest}
            />
        </FieldWrapperForm>
    )
}
export default InputForm;