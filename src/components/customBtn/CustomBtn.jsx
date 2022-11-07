import { BaseButton, GoogleSignInButton, InvertedButton } from './custombtn.styles';

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
    return {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType];
};

const CustomBtn = ({ children, buttonType, ...props }) => {
    const CustomButton = getButton(buttonType);
    return <CustomButton {...props}>{children}</CustomButton>;
};

export default CustomBtn;
