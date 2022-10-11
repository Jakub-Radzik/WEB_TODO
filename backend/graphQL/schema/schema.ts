import { buildSchema } from "graphql";

var schema = buildSchema(`
    type Query {
        message: String
    }
`);

module.exports = schema;