import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';
import FileInput from '~/components/FileInput';

import { Container } from './styles';

const schema = Yup.object().shape({
  avatar_id: Yup.string(),
  name: Yup.string(),
  email: Yup.string().email(),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) => (oldPassword ? field.min(6).required() : field)),
  confirmPassword: Yup.string().when('password', (password, field) => (password ? field.required().oneOf([Yup.ref('password')]) : field)),
});

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit} schema={schema}>
        <FileInput name="avatar_id" field="avatar" />
        <Input name="name" placeholder="Full name" />
        <Input type="email" name="email" placeholder="Your address of e-mail" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Your password old"
        />
        <Input type="password" name="password" placeholder="New password" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />

        <button type="submit">Update profile</button>
      </Form>

      <button type="button" onClick={handleSignOut}>
        Sair do GoMeetapp
      </button>
    </Container>
  );
}
