import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import configStore from './redux/configStore';
import router from './router';

const store = configStore();

export default class Root extends React.Component {
  render() {
    return (
      <CookiesProvider>
        <Provider store={store}>{router}</Provider>
      </CookiesProvider>
    );
  }
}
