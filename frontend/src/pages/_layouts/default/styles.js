import styled from 'styled-components';

import explore from '~/assets/explore.svg';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-180deg, #22202c, #402845);
  background-image: url(${explore});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
