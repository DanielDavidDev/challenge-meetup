import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/SignIn';

const routes = createAppContainer(
  createSwitchNavigator({
    SignIn,
  }),
);

export default routes;
