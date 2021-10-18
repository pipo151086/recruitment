import React from 'react';
import { Text, Modal, useToast, VStack, Button, Switch } from 'native-base';
import localizationEn from '../../localization/localization-en';
import { Formik } from 'formik';
import * as yup from 'yup';
import { InputForm, ButtonForm, SwitchForm } from '../../components'
import { Edit } from '../../comunication/devices'

const DeviceEdit = ({ item, visibleEdit, setVisibleEdit, setShowSuccessToast, setShowErrorToast, setItem }) => {

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

                    <Formik
                        initialValues={{
                            connected: item.connected,
                            parentLocation: item.parentLocation.toString(),
                            location: item.location.toString(),
                            signal: item.signal.toString(),
                            macAddress: item.macAddress.toString(),

                        }}
                        enableReinitialize
                        onSubmit={async values => {
                            let newitem = {
                                ...item,
                                ...values,
                                location: +values.location,
                                parentLocation: +values.parentLocation,
                                signal: +values.signal,
                            };
                            let upResult = await Edit(newitem);
                            //console.log(upResult)

                            if (upResult) {
                                setShowSuccessToast(true);
                                setItem(newitem);
                            }
                            else {
                                setShowErrorToast(true);
                            }


                            setVisibleEdit(false);
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
                                <SwitchForm
                                    label={localizationEn["Device.lbl.Status"]}
                                    formikProps={formikProps}
                                    formikKey={"connected"}
                                    placeholder={localizationEn["Device.lbl.Status"]}
                                //size={"xl"}
                                ></SwitchForm>
                                <InputForm
                                    label={localizationEn["Device.lbl.ParentLocation"]}
                                    formikProps={formikProps}
                                    formikKey={"parentLocation"}
                                    placeholder={localizationEn["Device.lbl.ParentLocation"]}
                                    keyboardType="decimal-pad"
                                />
                                <InputForm
                                    label={localizationEn["Device.lbl.Location"]}
                                    formikProps={formikProps}
                                    formikKey={"location"}
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
                                    label={localizationEn["Device.lbl.Mac"]}
                                    formikProps={formikProps}
                                    formikKey="macAddress"
                                    placeholder={localizationEn["Device.lbl.Mac"]}
                                    keyboardType="decimal-pad"
                                />

                                {/* <MaskedInputForm label={localizationEn["Device.lbl.macAddress"]}
                                    formikProps={formikProps}
                                    formikKey="macAddress"
                                    placeholder={localizationEn["Device.lbl.Mac"]}
                                    style={{ color: "white" }}
                                    mask={(text) => {
                                        var resultText = ''
                                        if (text) {
                                            let splitedText = text.match(/.{1,2}/g)
                                            if (splitedText.length > 1) {
                                                
                                                splitedText.map(el => {
                                                    resultText += `${el}-`
                                                })
                                            }
                                        }
                                        return resultText;
                                        
                                    }}
                                >
                                </MaskedInputForm>*/}

                                <ButtonForm
                                    formikProps={formikProps}
                                    title={localizationEn["Device.saveBtn"]}
                                    titleWhileSubmitting={localizationEn["Device.saveBtnAct"]}
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