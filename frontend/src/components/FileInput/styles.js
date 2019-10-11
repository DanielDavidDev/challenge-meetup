import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  margin-bottom: 30px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 0 3px rgba(93, 97, 164, 0.8);
    transform: translateY(-5px);
    transition: all 0.4s;
  }

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 350px;
    cursor: pointer;

    img {
      flex: 1;
      width: 100%;
      height: 350px;
    }

    h1 {
      font-size: 23px;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 10px;
    }
    input {
      display: none;
    }
  }
`;
