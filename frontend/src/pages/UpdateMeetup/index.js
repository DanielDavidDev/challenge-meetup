import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import DatePicker from '~/components/DatePicker';
import FileInput from '~/components/FileInput';

import { Container, Buttons } from './styles';

const schema = Yup.object().shape({
  banner_id: Yup.number(),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date('That field is a date').required('Date is required'),
  location: Yup.string().required('Location is required'),
});

export default function UpdateMeetup({ match }) {
  const { id } = match.params;
  const [meetup, setMeetup] = useState(null);
  const [loadding, setLoadding] = useState(false);

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`/meetups/${id}`);
      setMeetup(response.data);
    }
    setLoadding(true);
    loadMeetup();
    setLoadding(false);
  }, [id]);

  async function handleUpdate(data) {
    try {
      setLoadding(true);
      const response = await api.put(`/meetups/${id}`, data);

      toast.success('That updated meetup with success!');
      setMeetup(response.data);
      setLoadding(false);
      history.push('/dashboard');
    } catch (err) {
      toast.error('Failure updated meetup!');
    }
  }

  return (
    <Container>
      <Form initialData={meetup} schema={schema} onSubmit={handleUpdate}>
        <FileInput name="banner_id" field="banner" />
        <Input name="title" placeholder="Title" />
        <Input name="description" placeholder="Description" multiline />
        <DatePicker name="date" placeholder="Date" />
        <Input name="location" placeholder="Location" />
        <Buttons>
          <button type="submit" disabled={loadding}>Update</button>
          <button type="submit" onClick={() => history.push('/dashboard')}>Voltar</button>
        </Buttons>
      </Form>
    </Container>
  );
}

UpdateMeetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
