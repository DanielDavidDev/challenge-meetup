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
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      const year = date.getFullYear();

      if (date.getDate() < 10) {
        day = `0${day}`;
      }
      if (date.getMonth() < 10) {
        month = `0${month}`;
      }

      const dateFormatted = `${year}-${month}-${day}`;
      try {
        const response = await api.get('meetups', {
          params: {
            page: 1,
            date: `${dateFormatted}`,
          },
        });
        setMeetups(response.data);
      } catch (err) {
        console.tron.log(err);
      }
    }

    loadMeetups();
  }, []);

  function handleAddMeetup() {
    history.push('meetups/new');
  }

  function handleChange({ title }) {
    history.push(`meetups/${title}`);
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
                <button type="submit" onClick={() => handleChange(meetup)}>
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
