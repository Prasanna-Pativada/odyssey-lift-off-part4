import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: async (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },

    // get a single track by ID, for the track page
    track: async (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },

    // get a single module by ID, for the module detail page
    module: async (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getModule(id);
    },
  },

  Track: {
    // resolve the author of a track
    author: async ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },

    // resolve modules belonging to a track
    modules: async ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id);
    },
  },

  Mutation: {
    // increments a track's numberOfViews property
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (err: any) {
        return {
          code: err?.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null
        };
      }
    },
  },
};
