import { useState } from 'react';
import { signInWithGooglePopup, signUserInWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import showToastMessage from '../../utils/notification.utils';
import CustomBtn, { BUTTON_TYPE_CLASSES } from '../customBtn/CustomBtn';
import FormInput from './../formInput/FormInput';

const SignInForm = () => {
    const [user, setUser] = useState({ email: '', password: '' });

    const { email, password } = user;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = showToastMessage('loading', 'Logging...');

        try {
            const { user } = await signUserInWithEmailAndPassword(email, password);
            showToastMessage('success', 'Logged In', id);
            setUser({ email: '', password: '' });
        } catch (err) {
            switch (err.code) {
                case 'auth/wrong-password':
                    showToastMessage('error', 'password or email incorrect', id);
                    break;

                case 'auth/user-not-found':
                    showToastMessage('error', 'No User Found', id);
                    break;

                case 'auth/email-already-in-use':
                    showToastMessage('error', 'Email already in use', id);
                    break;

                default:
                    console.log(err.message);
                    console.log(err.code);
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
