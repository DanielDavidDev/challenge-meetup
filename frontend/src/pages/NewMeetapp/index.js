import React from 'react';
import { useDispatch } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import FileInput from '~/components/FileInput';
import DatePicker from '~/components/DatePicker';

import { addMeetupRequest } from '~/store/modules/meetup/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  banner_id: Yup.number(),
  title: Yup.string().required('Title is required for create new meetapp.'),
  description: Yup.string().required(
    'Description is required for create new meetapp.'
  ),
  location: Yup.string().required(
    'Location is required for create new meetapp.'
  ),
  date: Yup.date().required('Date is required for create new meetapp.'),
});

export default function NewMeetapp() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(addMeetupRequest(data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema}>
        <FileInput name="banner_id" field="banner" />
        <Input name="title" placeholder="Title" />
        <Input
          type="text"
          multiline
          name="description"
          placeholder="Description"
        />
        <Input name="location" placeholder="Location" />
        <DatePicker name="date" placeholder="Date" />

        <button type="submit">New Meetapp</button>
      </Form>
    </Container>
  );
}
