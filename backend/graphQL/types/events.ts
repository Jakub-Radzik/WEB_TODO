import { GraphQLBoolean, GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from "graphql";

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
        colorId: { type: GraphQLString },
        htmlLink: { type: GraphQLString },
        created: { type: GraphQLString },
        updated: { type: GraphQLString },
        summary: { type: GraphQLString },
        description: { type: GraphQLString },
        creator: { type: eventCreatorType},
        organizer: { type: eventOrganizerType},
        start: { type: eventTimeType},
        end: {type: eventTimeType}
    },
  });


  export interface GoogleEventInput {
    summary: string
    description: string
    start: {
        date?: string
        dateTime?: string
        timeZone?: string
    },
    end: {
        date?: string
        dateTime?: string
        timeZone?: string
    }
    colorId: string
    isGoogleMeet: boolean
  }

  const eventInputTimeType = new GraphQLInputObjectType({
    name: 'GoogleInputEventTime',
    fields: {
        dateTime: { type: GraphQLString },
        timeZone: {type: GraphQLString},
        date: {type: GraphQLString},
    }
})

  export const googleInputEventType = new GraphQLInputObjectType({
    name: 'GoogleInputEvent',
    fields: {
        summary: { type: GraphQLString },
        description: { type: GraphQLString },
        start: { type: eventInputTimeType},
        end: { type: eventInputTimeType},
        colorId: { type: GraphQLString },
        isGoogleMeet: { type: GraphQLBoolean },
    },
  });
