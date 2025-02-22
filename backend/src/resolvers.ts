import { Resolvers } from '../__generated__/graphql.js';
import { AppContext } from './interfaces.js';

export const resolvers: Resolvers = {
  Query: {
    history: async (_, _input, context: AppContext) => {
      return await context.dataSources.forecast.getForecastHistory();
    },
    forecast: async (_, { input }, context: AppContext) => {
      return await context.dataSources.forecast.getForecast(input);
    },
    updateMissingDays: async (_, { input }, context: AppContext) => {
      return await context.dataSources.forecast.updateMissingDays(input);
    },
  },
};
