import React from 'react';
import { VStack, Switch } from 'native-base';
import FieldWrapperForm from '../FieldWrapperForm'

const SwitchForm = ({ formikProps, formikKey, label, placeholder, ...rest }) => {
    return (
        <FieldWrapperForm formikProps={formikProps} formikKey={formikKey} label={label}>
            <VStack style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <Switch
                    placeholder={placeholder ? placeholder : label}
                    isChecked={formikProps.values[formikKey]}
                    onToggle={(val) => {
                        formikProps.setFieldValue(formikKey, val);
                    }}
                    {...rest}
                />
            </VStack>
        </FieldWrapperForm>
    )
}

export default SwitchForm;