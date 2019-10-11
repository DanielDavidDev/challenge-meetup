import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required('The e-mail is required'),
  password: Yup.string()
    .min(6, 'The password need  have at least 6 characters')
    .required('The password is required'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <>
      <Form onSubmit={handleSubmit} schema={schema}>
        <img src={logo} alt="GoMetapp" />
        <Input name="name" placeholder="Your full name" />
        <Input name="email" type="email" placeholder="Your e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Your secret password"
        />
        <button type="submit">Create account</button>
        <Link to="/">I already have an account</Link>
      </Form>
    </>
  );
}
