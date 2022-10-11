import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type Query {
        message: String
        what: String
        roll: [Int]
    }
`);
