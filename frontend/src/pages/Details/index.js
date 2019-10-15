import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import Banner from '~/components/FileInput';
import DatePicker from '~/components/DatePicker';

import {
  Container,
  Buttons,
  Wrapper,
  ImageBanner,
  Title,
  Description,
  Location,
  Date,
} from './styles';

export default function Details({ match }) {
  const { id } = match.params;

  const [meetup, setMeetup] = useState(null);
  const [loadding, setLoadding] = useState(false);
  const [subscription, setSubscription] = useState(0);

  async function handleEdit() {
    history.push(`/meetup/${id}/update`);
  }

  async function handleDelete() {
    try {
      await api.delete(`/meetups/${id}`);

      setMeetup(null);
      toast.success('That meetup deleted with success!');
      history.push('/dashboard');
    } catch (err) {
      toast.error('Failure delete meetup!');
    }
  }


  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`meetups/${id}`);

      setMeetup(response.data);
    }
    async function loadSubs() {
      const response = await api.get(`/meetups/${id}/subscriptions`);
      setSubscription(response.data.lenght);
    }
    setLoadding(true);
    loadMeetup();
    loadSubs();
    setLoadding(false);
  }, [id]);

  return (
    <Container>
      {meetup ? (
        <Buttons>
        <button type="submit" onClick={handleEdit}>
          Editar
        </button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </Buttons>
      ) : null}
      <Wrapper>
        <section>
          {meetup && (
            <>
              <ImageBanner src={meetup.banner.url}/>
              <Title>{meetup.title}</Title>
              <Description>{meetup.description}</Description>
              <Location>{meetup.location}</Location>
              <Date>{meetup.date}</Date>
            </>
          )}
        </section>
        <section>
          {subscription}
        </section>

        <button type="submit" onClick={() => history.goBack()}>{loadding ? 'Carregando...' : 'Save'}</button>
      </Wrapper>
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
