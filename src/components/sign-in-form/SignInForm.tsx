import { useDispatch } from 'react-redux';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from '../formInput/FormInput';
import CustomBtn, { BUTTON_TYPE_CLASSES } from '../customBtn/CustomBtn';
import showToastMessage from '../../utils/notification.utils';
import { emailSignInStart, googleSignInStart } from '../../store/user/userAction';

const SignInForm = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({ email: '', password: '' });

    const { email, password } = user;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = showToastMessage('loading', 'Logging...');

        try {
            dispatch(emailSignInStart(email, password));
            showToastMessage('success', 'Logged In', id);
            setUser({ email: '', password: '' });
        } catch (err) {
            switch ((err as AuthError).code) {
                case AuthErrorCodes.INVALID_PASSWORD:
                    showToastMessage('error', 'password or email incorrect', id);
                    break;

                case AuthErrorCodes.USER_DELETED:
                    showToastMessage('error', 'No User Found', id);
                    break;

                case AuthErrorCodes.EMAIL_EXISTS:
                    showToastMessage('error', 'Email already in use', id);
                    break;

                default:
                    console.log((err as AuthError).message);
                    // @ts-ignore
                    console.log((err as AuthError).code);
                    break;
            }
        }
    };

    return (
        <div className="sign-up-container">
            <h2>already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={'email'} type="email" value={email} name="email" onChange={handleChange} required />
                <FormInput
                    label={'password'}
                    type="passoword"
                    value={password}
                    name="password"
                    onChange={handleChange}
                    required
                />

                <div className="buttons-container">
                    <CustomBtn type={'submit'}>SIGN IN</CustomBtn>
                    <CustomBtn type={'button'} buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        GOOGLE SIGN IN
                    </CustomBtn>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
