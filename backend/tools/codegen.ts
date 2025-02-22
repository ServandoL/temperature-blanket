import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/schema.graphql',
  require: ['ts-node/register'],
  generates: {
    '__generated__/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        maybeValue: 'T | undefined',
        skipTypeNames: true,
      },
    },
  },
};
export default config;
