import React from 'react';
import { View } from 'react-native'
import {
  Text,
  HStack,
  Switch,
  useColorMode,
} from 'native-base';
import { ThemeView, InputForm, PasswordForm, ButtonForm } from '../../components'
import { Formik } from 'formik';
import * as yup from 'yup';
import LottieView from 'lottie-react-native';

const required = "required";

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === 'light' ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}

const Login = () => {
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
          console.log("Enter Submiting", values);
          debugger
          console.log("Exit Submiting", values);
        }}
        validationSchema={yup.object().shape({
          userName: yup.string().required(required),
          password: yup.string().required(required),
        })}

      >
        {(formikProps) => {
          return (<>


            <InputForm
              label="UserName"
              formikProps={formikProps}
              formikKey="userName"
              placeholder="Type UserName"
              style={{ width: "100%" }}
            />
            <PasswordForm
              label="Password"
              formikProps={formikProps}
              formikKey="password"
              placeholder="Type password"
              showButton
            />
            <ButtonForm formikProps={formikProps} title={"Save"} titleWhileSubmitting={"Saving"} />


          </>)
        }}
      </Formik>
      <ToggleDarkMode />

    </ThemeView>
  );

};
export default Login;
