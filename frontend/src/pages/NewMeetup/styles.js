import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 920px;
  margin: 30px auto auto;
  padding: 0 30px;

  form {
    display: flex;
    flex-direction: column;

    input,
    textarea {
      width: 100%;
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      height: 48px;
      padding: 0 15px;
      color: #eee;
      border-radius: 4px;
      margin: 0 0 10px;
      transition: box-shadow 0.2s;

      &:focus {
        box-shadow: 0 0 3px rgba(93, 97, 164, 0.35);
      }

      &:hover {
        box-shadow: 0 0 3px rgba(93, 97, 164, 0.8);
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    textarea {
      resize: none;
      height: 100px;
      padding: 15px;
    }

    span {
      color: #f94d6a;
      align-self: stretch;
      margin: 0 0 10px;
      font-weight: bold;
    }

    > button {
      width: 180px;
      height: 44px;
      align-self: flex-end;
      align-content: center;
      justify-content: center;
      margin: 5px 0 0;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      svg {
        margin-right: 8px;
      }

      &:hover {
        background: ${darken(0.03, '#f94d6a')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
    }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0 0 20px 0;
  padding: 5px;

  > button {
    margin: 0 10px 0 0;
    align-self: flex-end;
    background: #445ae3;
    font-weight: bold;
    letter-spacing: 0.5px;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 10px 14px;
    font-size: 16px;
    transition: background 0.2s;
    display: flex;
    align-items: center;

    &:first-child {
      background: #f94d6a;

      &:hover {
        background: ${darken(0.03, '#f94d6a')};
      }
    }

    &:hover {
      background: ${darken(0.03, '#445ae3')};
    }

    &:disabled {
      opacity: 0.7;
      cursor: wait;
    }
  }
`;
