import { createStore } from 'redux';
import reducer from './rootReducer';

export default function configStore() {
  const store = createStore(
    reducer,
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
