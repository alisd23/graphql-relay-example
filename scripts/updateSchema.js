const fs = require('fs');
const path = require('path');
const Schema = require('../server/GraphQLSchema');
const graphql = require('graphql').graphql;
const qlUtils = require('graphql/utilities');

// Save JSON of full schema introspection for Babel Relay Plugin to use
graphql(Schema, qlUtils.introspectionQuery).then((result) => {
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../schema.json'),
      JSON.stringify(result, null, 2)
    );
  }

  // Save user readable type system shorthand of schema
  fs.writeFileSync(
    path.join(__dirname, '../schema.graphql'),
    qlUtils.printSchema(Schema)
  );
});
