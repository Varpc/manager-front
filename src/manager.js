import React from 'react';
import { Provider } from 'react-redux';
import router from './router';
import configStore from './redux/configStore';

const store = configStore();

export default <Provider store={store}>{router}</Provider>;
