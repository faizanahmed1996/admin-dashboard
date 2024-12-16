import * as Yup from 'yup';
import { LoginValues, RegisterValues } from 'src/auth/types';

export const REGISTER_VALUES: RegisterValues = {
  name: '',
  username: '',
  email: '',
  password: '',
};

export const LOGIN_VALUES: LoginValues = {
  username: '',
  password: '',
};

export const REGISTER_SCHEMA = Yup.object().shape({
  name: Yup.string().required('First name required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

export const LOGIN_SCHEMA = Yup.object().shape({
  username: Yup.string().required('Username or Email is required'),
  password: Yup.string().required('Password is required'),
});
