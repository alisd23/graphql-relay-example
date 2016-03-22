import React from 'react';
import Relay from 'react-relay';
import RelayDecorator from './RelayDecorator';
import AuthorList from './AuthorList';

const relayData = {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        authors {
          name, id
        }
      }
    `,
  }
}

@RelayDecorator(relayData)
export default class App extends React.Component {
  render() {
    return (
      <section>
        <h1>Main App</h1>
        <AuthorList authors={this.props.viewer.authors} />
      </section>
    );
  }
}
