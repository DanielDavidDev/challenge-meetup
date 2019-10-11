import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 920px;
  margin: 50px auto;
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
      height: 130px;
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
      margin: 5px 0 0;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

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
