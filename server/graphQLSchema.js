const data = require('./data');
const graphql = require('graphql');

// Define our user type, with two string fields; `id` and `name`
const Author = new graphql.GraphQLObjectType({
  name: 'Author',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});
const Viewer = new graphql.GraphQLObjectType({
  name: 'Viewer',
  fields: {
    authors: {
      type: new graphql.GraphQLList(Author),
      resolve: function (_, args) {
        return Object.keys(data).map(id => data[id]);
      }
    },
    author: {
      type: Author,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: function (_, args) {
        return data[args.id];
      }
    }
  }
});

const schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      viewer: {
        type: Viewer,
        resolve: () => Viewer
      }
    }
  })
});

module.exports = schema;
