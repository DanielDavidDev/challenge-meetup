import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 920px;
  margin: 50px auto;
  padding: 0 30px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 920px;
  width: 100%;
  margin: 30px auto;

  h1 {
    color: #fff;
    font-weight: bold;
    font-size: 30px;
  }

  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 0;
    border-radius: 4px;
    background: #d44059;
    color: #fff;
    font-weight: bold;
    transition: background 0.2s;

    svg {
      margin-right: 10px;
    }

    &:hover {
      background: ${darken(0.03, '#d44059')};
    }
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
    border: 0;
    height: 62px;
    margin: 0 0 10px;
    padding: 0 20px;
    width: 100%;
    border-radius: 4px;

    strong {
      color: #fff;
      font-size: 22px;
      margin-left: 20px;
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: center;

      p {
        color: rgba(255, 255, 255, 0.7);
        margin: 0 15px;

        svg {
          margin: 0 10px;
        }
      }
      button {
        background: none;
        border: 0;
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        transition: background 0.2s;

        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }

  > li {
    margin-top: 20px;
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  max-width: 920px;
  height: 62px;
  margin: 20px 0;
  padding: 0 20px;
  width: 100%;
  border-radius: 4px;
  align-items: center;

  h1 {
    color: #fff;
    font-size: 26px;
    font-weight: bold;
  }
`;
