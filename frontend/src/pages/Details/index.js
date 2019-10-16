import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Buttons,
  Wrapper,
  ImageBanner,
  Title,
  Description,
  Location,
  Date,
  Meetup,
  Content,
  Loadding,
} from './styles';

export default function Details({ match }) {
  const { id } = match.params;

  const [meetup, setMeetup] = useState(null);
  const [loadding, setLoadding] = useState(false);
  const [subscription, setSubscription] = useState(0);

  async function handleEdit() {
    history.push(`/meetups/${id}/update`);
  }

  async function handleDelete() {
    try {
      setLoadding(true);
      await api.delete(`/meetups/${id}`);

      setMeetup(null);
      toast.success('That meetup deleted with success!');
      setLoadding(false);
      history.push('/dashboard');
    } catch (err) {
      toast.error('Failure delete meetup!');
    }
  }

  useEffect(() => {
    async function loadMeetup() {
      const meetupsResponse = await api.get(`meetups/${id}`);
      const subsResponse = await api.get(`/meetups/${id}/subscriptions`);
      setMeetup(meetupsResponse.data);
      setSubscription(subsResponse.data.length);
    }
    setLoadding(true);
    loadMeetup();
    setLoadding(false);
  }, [id]);

  return (
    <Container>
        <Buttons>
        <button type="submit" onClick={handleEdit}>Editar</button>
        <button type="button" onClick={handleDelete} disabled={loadding}>
          {loadding ? '...' : 'Delete'}
        </button>
      </Buttons>
      <Wrapper>
        <section>
          {meetup ? (
            <Meetup>
              <ImageBanner src={meetup.banner.url}/>
              <Content>
                <Title>{meetup.title}</Title>
                <Description>{meetup.description}</Description>

                <Location>{meetup.location}</Location>
                <Date>{meetup.date}</Date>
                {subscription}
              </Content>
            </Meetup>
          ) : (
            <Loadding>
              Loading...
            </Loadding>
          )}
        </section>
        <button type="submit" onClick={() => history.goBack()}>Voltar</button>
      </Wrapper>
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
