import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container, Banner } from './styles';
import {
  deleteMeetupRequest,
  updateMeetupRequest,
} from '~/store/modules/meetup/actions';

const schema = Yup.object().shape({
  avatar_id: Yup.string(),
  name: Yup.string(),
  email: Yup.string().email(),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) => (oldPassword ? field.min(6).required() : field)),
  confirmPassword: Yup.string().when('password', (password, field) => (password ? field.required().oneOf([Yup.ref('password')]) : field)),
});

export default function Details() {
  const dispatch = useDispatch();
  const meetapp = useSelector((state) => state.meetup.meetup);

  function handleEdit(data) {
    console.tron.log(data);
    // dispatch(updateMeetupRequest(data));
  }

  function handleDelete() {}

  return (
    <Container>
      <Form initialData={meetapp} schema={schema}>
        <div>
          <button type="submit" onClick={handleEdit}>
            Editar
          </button>
          <button type="button">Delete</button>
        </div>
        <Banner src={meetapp.banner.url} alt="Banner" />
      </Form>
    </Container>
  );
}
