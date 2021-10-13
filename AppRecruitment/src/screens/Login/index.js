import React, { useState, useContext } from 'react';
import { View } from 'react-native'
import {
  Text,
  HStack,
  Switch,
  useColorMode,
  Center,
  MoonIcon,
  SunIcon,
} from 'native-base';
import { ThemeView, InputForm, PasswordForm, ButtonForm } from '../../components'
import { Formik } from 'formik';
import * as yup from 'yup';
import LottieView from 'lottie-react-native';

import Localization from '../../localization/localization-en'
import { Auth } from '../../comunication/security'
import { addContext, updateContext } from '../../database/common/handler';
import moment from 'moment';
import { AppContext } from '../../providers/index';

// Color Switch Component
function ToggleDarkMode({ selectTheme, setSelectTheme }) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Center style={{ width: "100%", position: "absolute", bottom: 0 }}>
      <HStack space={2}>
        <Text>Dark</Text>
        <MoonIcon size="4" />
        <Switch
          isChecked={selectTheme === 'light' ? true : false}
          onToggle={(val) => {
            setSelectTheme((val === true) ? 'light' : 'dark');
            toggleColorMode()
          }}
          aria-label={
            selectTheme === 'light' ? 'switch to dark mode' : 'switch to light mode'
          }
        />
        <Text>Light</Text>
        <SunIcon size="4" />
      </HStack>
    </Center>
  );
}

const Login = () => {
  const { themeApp, setThemeApp, changeTheme } = useContext(AppContext);
  return (
    <ThemeView>
      <View style={{ width: "100%", height: "50%", alignItems: "center", justifyContent: "center" }}>
        <LottieView source={require('../../assets/lottieFiles/31631-astronautcopy.json')} autoPlay loop />
      </View>

      <Formik
        initialValues={{
          userName: "",
          password: ""
        }}
        //enableReinitialize
        onSubmit={async values => {
          let signInResult = await Auth(values);
          let newContext = {
            session: {
              userId: signInResult.userId,
              docNumber: signInResult.userDocNumber,
              docType: signInResult.userDocType,
              jwt: signInResult.jwt,
            }
          }
          
          await updateContext({
            context: JSON.stringify(newContext),
            theme: themeApp,
            lastTimeAccessed: moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
          });
          
          console.log("Exit Submiting", values);
        }}
        validationSchema={yup.object().shape({
          userName: yup.string().required(Localization["requiredField"]),
          password: yup.string().required(Localization["requiredField"]),
        })}

      >
        {(formikProps) => {
          return (<>
            <InputForm
              label={Localization["Login.lbl.Username"]}
              formikProps={formikProps}
              formikKey="userName"
              placeholder={Localization["Login.ph.Username"]}
            />
            <PasswordForm
              label={Localization["Login.lbl.Password"]}
              formikProps={formikProps}
              formikKey="password"
              placeholder={Localization["Login.ph.Password"]}
              showButton
            />
            <ButtonForm
              formikProps={formikProps}
              title={Localization["Login.LoginBtn"]}
              titleWhileSubmitting={"Login.LoginBtnAct"} />
          </>)
        }}
      </Formik>
      <ToggleDarkMode
        setSelectTheme={changeTheme}
        selectTheme={themeApp}
      />

    </ThemeView>
  );

};
export default Login;
