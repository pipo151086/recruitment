import React from 'react';
import { Button } from 'native-base';

const ButtonForm = ({ formikProps, title, titleWhileSubmitting, ...rest }) => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    React.useEffect(() => setIsSubmitting(formikProps.isSubmitting), [formikProps.isSubmitting])
    return (<Button
        isLoading={isSubmitting}
        _loading={{
            bg: "amber.400:alpha.70",
            _text: {
                color: "coolGray.700",
            },
        }}
        _spinner={{
            color: "white",
        }}
        disabled={isSubmitting}
        isLoadingText={titleWhileSubmitting ? titleWhileSubmitting : "Submiting"}
        onPress={formikProps.handleSubmit}
        {...rest}
    >
        {title ? title : `Submit`}
    </Button>)
}

export default ButtonForm;