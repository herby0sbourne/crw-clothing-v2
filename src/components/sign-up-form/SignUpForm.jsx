import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import FormInput from '../formInput/FormInput';
import CustomBtn from '../customBtn/CustomBtn';
import showToastMessage from '../../utils/notification.utils';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import './signupform.scss';
import 'react-toastify/dist/ReactToastify.css';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  // const showToastMessage = () => {
  //   toast.error('password does not match', {
  //     position: 'top-center',
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: 'light',
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToastMessage('error', 'password does not match');
      return;
    }
    // const id = toast.loading('Please wait...');

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      // toast.update(id, { render: 'User Created', type: 'success', isLoading: false });
    } catch (err) {
      // toast.update(id, { render: 'Creating user failed', type: 'error', isLoading: false });
      if (err.code === 'auth/email-already-in-use') {
        alert('email already in use');
      } else {
        console.log('error creating user', err);
        console.log(err.message);
        console.log(err.code);
      }
    }
  };

  return (
    <div className={'sign-up-container'}>
      <h2>Dont have an account</h2>
      <span>Sign up width your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          value={displayName}
          name="displayName"
          onChange={handleChange}
          required
        />
        <FormInput label="Email" type="email" value={email} name="email" onChange={handleChange} required />
        <FormInput
          label={'Password'}
          type="password"
          value={password}
          name="password"
          onChange={handleChange}
          required
        />
        <FormInput
          label={'Confirm Password'}
          type="password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          required
        />

        <CustomBtn type={'submit'}>Sign Up</CustomBtn>
      </form>
      <ToastContainer newestOnTop={false} rtl={false} pauseOnFocusLoss />
    </div>
  );
};

export default SignUpForm;
