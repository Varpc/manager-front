import React from 'react';
import { CookiesProvider } from 'react-cookie';
import configStore from './redux/configStore';
import routeConfig from './routerConfig';
import Router from './router';

const store = configStore();

// export default class Root extends React.Component {
//   render() {
//     return (
//       <CookiesProvider>
//         <Provider store={store}>{router}</Provider>
//       </CookiesProvider>
//     );
//   }
// }


export default class Root extends React.Component {
  render() {
    return (
      <CookiesProvider>
        <Router store={store} routeConfig={routeConfig} />
      </CookiesProvider>
    );
  }
}
