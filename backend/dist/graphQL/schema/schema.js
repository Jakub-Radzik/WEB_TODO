"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
var schema = (0, graphql_1.buildSchema)(`
    type Query {
        message: String
    }
`);
module.exports = schema;
