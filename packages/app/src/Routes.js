import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { styled } from '@gamex/uix';
import Header from 'ui/components/header';
import { Login, Games, GameDetails, NoMatch } from 'pages';

const Container = styled('div', ({ $theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: $theme.colors.background,
}));

function Routes() {
  return (
    <Container>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/games" component={Games} />
          <Route exact path="/games/:gameid" component={GameDetails} />
          <Route path='*' component={NoMatch} />
        </Switch>
      </Router>
    </Container>
  );
}

export default Routes;
