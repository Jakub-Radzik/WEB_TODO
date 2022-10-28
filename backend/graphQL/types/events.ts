import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";

const eventCreatorType = new GraphQLObjectType({
    name: 'GoogleEventCreator',
    fields: {
        email: { type: GraphQLString },
    }
})


const eventOrganizerType = new GraphQLObjectType({
    name: 'GoogleEventOrganizer',
    fields: {
        email: { type: GraphQLString },
        displayName: { type: GraphQLString },
        self: { type: GraphQLBoolean },
    }
})

const eventTimeType = new GraphQLObjectType({
    name: 'GoogleEventTime',
    fields: {
        dateTime: { type: GraphQLString },
        timeZone: {type: GraphQLString},
        date: {type: GraphQLString},
    }
})

export const googleEventType = new GraphQLObjectType({
    name: 'GoogleEvent',
    fields: {
        hangoutLink: {type: GraphQLString},
        kind: { type: GraphQLString },
        id: { type: GraphQLString },
        status: { type: GraphQLString },
        htmlLink: { type: GraphQLString },
        created: { type: GraphQLString },
        updated: { type: GraphQLString },
        summary: { type: GraphQLString },
        creator: { type: eventCreatorType},
        organizer: { type: eventOrganizerType},
        start: { type: eventTimeType},
        end: {type: eventTimeType}
    },
  });
