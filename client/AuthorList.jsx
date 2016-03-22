import React from 'react';

export default class AuthorList extends React.Component {
  render() {
    return (
      <div>
        <h2>Authors</h2>
        {
          this.props.authors.map((author) => (
            <div key={author.id}>
              <h3>{author.name}</h3>
            </div>
          ))
        }
      </div>
    );
  }
}
