import React from 'react';
import {
    FormControl,
    WarningOutlineIcon
} from 'native-base';

const FieldWrapperForm = ({ children, formikProps, formikKey, label }) => {
    return (
        <FormControl isInvalid={formikProps.errors[formikKey]}
            style={{}}
        >
            <FormControl.Label>{label}</FormControl.Label>
            {children}
            {formikProps.errors[formikKey] &&
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {formikProps.errors[formikKey]}
                </FormControl.ErrorMessage>
            }
        </FormControl>
    )
}

export default FieldWrapperForm