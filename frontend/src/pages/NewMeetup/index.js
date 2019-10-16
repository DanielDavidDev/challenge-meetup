import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import DatePicker from '~/components/DatePicker';
import FileInput from '~/components/FileInput';

import { Container, Buttons } from './styles';

const schema = Yup.object().shape({
  banner_id: Yup.number().required('Banner is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date('That field is a date').required('Date is required'),
  location: Yup.string().required('Location is required'),
});

export default function NewMeetup() {
  const [loadding, setLoadding] = useState(false);

  async function handleNewMeetup(data) {
    try {
      setLoadding(true);
      await api.post('/meetups', data);

      toast.success('That created meetup with success!');
      setLoadding(false);
      history.push('/dashboard');
    } catch (err) {
      toast.error('Failure created meetup!');
    }
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleNewMeetup}>
        <FileInput name="banner_id" field="banner" />
        <Input name="title" placeholder="Title" />
        <Input name="description" placeholder="Description" multiline />
        <Input name="location" placeholder="Location" />
        <DatePicker name="date" placeholder="Date" />
        <Buttons>
          <button type="submit" disabled={loadding}>Create</button>
          <button type="button" onClick={() => history.push('/dashboard')}>Voltar</button>
        </Buttons>
      </Form>
    </Container>
  );
}
