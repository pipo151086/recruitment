import React from 'react';
import { Text, Modal, FormControl, VStack, Button, Switch } from 'native-base';
import localizationEn from '../../localization/localization-en';
import { Formik } from 'formik';
import * as yup from 'yup';
import {  InputForm, ButtonForm, FieldWrapperForm } from '../../components'
import MaskInput from 'react-native-mask-input';

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

const DeviceEdit = ({ item, visibleEdit, setVisibleEdit }) => {

    return (
        <Modal
            isOpen={visibleEdit}
            onClose={() => setVisibleEdit(false)}
            _backdrop={{
                _dark: {
                    bg: "coolGray.800",
                },
                bg: "warmGray.50",
            }}
        //size={'full'}
        >

            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Device Edit</Modal.Header>
                <Modal.Body>



                    <VStack style={{ margin: 20 }}>
                        <Text >{`${localizationEn["Device.lbl.ParentLocation"]}  ${item.parentLocation}`}</Text>
                        <Text >{`${localizationEn["Device.lbl.Location"]}  ${item.location}`}</Text>
                        <Text >{`${localizationEn["Device.lbl.Signal"]}  ${item.signal}`}</Text>
                        <Text >{`${localizationEn["Device.lbl.Mac"]}  ${item.macAddress}`}</Text>
                        <Text>{`${localizationEn["Device.lbl.LastUpdate"]}  ${item.dateShow}`}</Text>
                    </VStack>


                    <Formik
                        initialValues={{
                            connected: item.connected,
                            parentLocation: item.parentLocation,
                            location: item.location,
                            signal: item.signal,
                            macAddress: item.macAddress,

                        }}
                        //enableReinitialize
                        onSubmit={async values => {
                            //updatedAt: item.dateShow,
                        }}
                        validationSchema={yup.object().shape({
                            parentLocation: yup.string().required(localizationEn["requiredField"]),
                            location: yup.string().required(localizationEn["requiredField"]),
                            signal: yup.string().required(localizationEn["requiredField"]),
                            macAddress: yup.string().required(localizationEn["requiredField"]),
                        })}

                    >
                        {(formikProps) => {
                            return (<>
                                <InputForm
                                    label={localizationEn["Device.lbl.ParentLocation"]}
                                    formikProps={formikProps}
                                    formikKey="parentLocation"
                                    placeholder={localizationEn["Device.lbl.ParentLocation"]}
                                    keyboardType="decimal-pad"
                                />
                                <InputForm
                                    label={localizationEn["Device.lbl.Location"]}
                                    formikProps={formikProps}
                                    formikKey="location"
                                    placeholder={localizationEn["Device.lbl.Location"]}
                                    keyboardType="decimal-pad"
                                />
                                <InputForm
                                    label={localizationEn["Device.lbl.Signal"]}
                                    formikProps={formikProps}
                                    formikKey="signal"
                                    placeholder={localizationEn["Device.lbl.Signal"]}
                                    keyboardType="decimal-pad"
                                />
                                <InputForm
                                    label={localizationEn["Device.lbl.Signal"]}
                                    formikProps={formikProps}
                                    formikKey="signal"
                                    placeholder={localizationEn["Device.lbl.Signal"]}
                                    keyboardType="decimal-pad"
                                />



                                <ButtonForm
                                    formikProps={formikProps}
                                    title={Localization["Device.saveBtn"]}
                                    titleWhileSubmitting={"Device.saveBtnAct"}
                                />

                            </>)
                        }}
                    </Formik>












                </Modal.Body>

            </Modal.Content>
        </Modal>
    )
}

export default DeviceEdit;