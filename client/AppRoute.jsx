import Relay from 'react-relay';

class AppRoute extends Relay.Route {
  static routeName = 'AppRoute';

  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
  };
}

export default AppRoute;
