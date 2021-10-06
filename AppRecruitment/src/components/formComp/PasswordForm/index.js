import React from 'react';
import {
    Input,
    Button
} from 'native-base';
import FieldWrapperForm from '../FieldWrapperForm';
import Localization from '../../../localization/localization-en';

const PasswordForm = ({ formikProps, formikKey, label, placeholder, showButton, ...rest }) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return (
        <FieldWrapperForm formikProps={formikProps} formikKey={formikKey} label={label}>
            <Input
                placeholder={placeholder ? placeholder : label}
                value={formikProps.values[formikKey]}
                onChangeText={formikProps.handleChange(formikKey)}
                onBlur={formikProps.handleBlur(formikKey)}
                type={show ? "text" : "password"}
                overflow="visible"
                InputRightElement={showButton &&
                    <Button roundedLeft="0" onPress={handleClick}>
                        {show ? Localization["passwordHideBtn"] : Localization["passwordShowBtn"]}
                    </Button>
                }
                {...rest}
            />
        </FieldWrapperForm>
    )
}

export default PasswordForm;