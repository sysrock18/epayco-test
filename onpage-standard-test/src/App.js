import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './shared/Header';
import Checkout from './pages/Checkout';
import Response from './pages/Response';
import Error404 from './pages/Error404';

class App extends Component {

  render() {
    return (
      <main role="application">
        <Header />
        
        <Switch>
          {/* Checkout */}
          <Route
            path="/"
            exact
            title="Checkout"
            component={Checkout}
          />
          {/* Response */}
          <Route
            path="/response"
            exact
            title="Response"
            component={Response}
          />
          {/* Error 404 */}
          <Route component={Error404} />
        </Switch>
      </main>
    );
  }
}

export default App;
