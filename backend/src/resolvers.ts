import { Resolvers } from '../__generated__/graphql.js';
import { AppContext } from './interfaces.js';
import { GraphQLError } from 'graphql';

export const resolvers: Resolvers = {
  Query: {
    history: async (_, { input }, context: AppContext) => {
      return await context.dataSources.forecast.getForecastHistory(input);
    },
    forecast: async (_, { input }, context: AppContext) => {
      return await context.dataSources.forecast.getForecast(input);
    },
    updateMissingDays: async (_, { input }, context: AppContext) => {
      return await context.dataSources.forecast.updateMissingDays(input);
    },
    forecastHistoryByDate: () => {
      throw new GraphQLError('Not implemented');
    },
  },
};
