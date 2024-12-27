import { Resolvers } from './__generated__/graphql.js';
import { getForecast, getForecastHistory } from './services.js';

export const resolvers: Resolvers = {
  Query: {
    history: async () => await getForecastHistory(),
    forecast: async (_, { input }) => await getForecast(input),
  },
};
