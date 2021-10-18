import React from 'react';
import { Text, Modal, FormControl, VStack, Button, Switch } from 'native-base';
import localizationEn from '../../localization/localization-en';
import { Formik } from 'formik';
import * as yup from 'yup';
import { InputForm, ButtonForm, FieldWrapperForm } from '../../components'
import MaskInput from 'react-native-mask-input';
import { Edit } from '../../comunication/devices'


const MaskedInputForm = ({ formikProps, formikKey, label, placeholder, ...rest }) => {
    return (
        <FieldWrapperForm formikProps={formikProps} formikKey={formikKey} label={label}>
            <MaskInput
                placeholder={placeholder ? placeholder : label}
                value={formikProps.values[formikKey]}
                onChangeText={formikProps.handleChange(formikKey)}
                onBlur={formikProps.handleBlur(formikKey)}
                {...rest}
            />
        </FieldWrapperForm>
    )
}
export default MaskedInputForm;