import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';

import DatePicker from '~/components/DatePicker';
import FileInput from '~/components/FileInput';

import { Container } from './styles';

const schema = Yup.object().shape({
  banner_id: Yup.number().required('Banner is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date('That field is a date').required('Date is required'),
  location: Yup.string().required('Location is required'),
});

export default function NewOrUpdate({ match }) {
  const { id, change } = match.params;

  const [meetup, setMeetup] = useState(null);
  const [loadding, setLoadding] = useState(null);

  async function handleEdit(data) {
    try {
      const response = await api.put(`/meetups/${id}`, data);

      toast.success('That meetup deleted with success!');
      setMeetup(response.data);
    } catch (err) {
      toast.error('Failure update meetup!');
    }
  }
  function handleNewMeetup() {}

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`/meetups/${id}`);

      setMeetup(response.data);
    }
    setLoadding(true);
    loadMeetup(id);
    setLoadding(false);
  }, [id]);

  return (
    <Container>
      <Form initialData={meetup} schema={schema}>
        {change === 'update' ? (
          <>
            <FileInput name="banner_id" field="banner" />
            <Input name="title" placeholder="Title" />
            <Input name="description" placeholder="Description" multiline />
            <DatePicker name="date" placeholder="Date" />
            <Input name="location" placeholder="Location" />
            <button type="submit" onClick={handleEdit}>Update</button>
          </>
        ) : (
          <>
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

            <button type="submit" onClick={handleNewMeetup}>New Meetapp</button>
          </>
        )}
        <button type="submit" disabled={loadding}>
          Save
        </button>
      </Form>
    </Container>
  );
}

NewOrUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      change: PropTypes.bool.isRequired,
    }),
  }).isRequired,
};
