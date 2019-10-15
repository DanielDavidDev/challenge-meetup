import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdKeyboardArrowRight, MdAddCircleOutline } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container, EmptyContainer, Wrapper, List,
} from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      const data = response.data.map((meetup) => ({
        ...meetup,
        formattedDate: format(parseISO(meetup.date), "dd/MM/Y - HH'h'mm"),
      }));

      setMeetups(data);
    }

    loadMeetups();
  }, []);

  function handleAddMeetup() {
    history.push('meetups/new');
  }

  function handleChange(id) {
    history.push(`meetups/${id}`);
  }

  return (
    <Container>
      <Wrapper>
        <h1>Meus Meetups</h1>
        <button type="submit" onClick={() => handleAddMeetup()}>
          <MdAddCircleOutline size={20} color="#fff" />
          Novo meetup
        </button>
      </Wrapper>
      <List>
        {meetups.length ? (
          meetups.map((meetup) => (
            <li key={meetup.id}>
              <strong>{meetup.title}</strong>
              <div>
                <p>
                  {format(parseISO(meetup.date), "dd 'de' MMMM', às' H'h'", {
                    locale: pt,
                  })}
                </p>
                <button type="submit" onClick={() => handleChange(meetup.id)}>
                  <MdKeyboardArrowRight size={26} color="#fff" />
                </button>
              </div>
            </li>
          ))
        ) : (
          <EmptyContainer>
            <h1>Nada para hoje ;(</h1>
          </EmptyContainer>
        )}
      </List>
    </Container>
  );
}
