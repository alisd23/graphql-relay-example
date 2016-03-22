import { createContainer } from 'react-relay';

export default function(relayData) {
  return function decorator(component) {
      return createContainer(component, relayData);
  }
}
