import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.6);
  padding: 5px 0;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 20px;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      margin-right: 25px;
      padding-right: 25px;
    }

    a {
      font-size: 16px;
      font-weight: bold;
      color: #d44059;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;

  button {
    display: flex;
    width: 65px;
    height: 30px;
    border-radius: 4px;
    justify-content: center;
    border: 0;
    color: #fff;
    font-weight: bold;
    background: #d44059;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#d44059')};
    }
  }

  div {
    text-align: right;
    margin: 0 20px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 5px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
      transition: color 0.2s;

      &:hover {
        color: #fff;
      }
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 25px;
  }
`;
