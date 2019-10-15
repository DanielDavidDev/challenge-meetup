import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import NewOrUpdate from '~/pages/NewOrUpdate';
import Details from '~/pages/Details';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/meetups/:id" exact component={Details} isPrivate />
      <Route path="/meetups/:action" exact component={NewOrUpdate} isPrivate />
      <Route path="/meetups/:id/update" component={NewOrUpdate} isPrivate />
    </Switch>
  );
}
