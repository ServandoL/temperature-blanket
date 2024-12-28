import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'backend/schema.graphql',
  /**
   * glob expression to your .graphql or .ts files with your query/mutation/sub
   * CHANGE TO YOUR USE CASE
   */
  documents: 'src/app/common/queries.ts',
  generates: {
    /**
     * only generates the base schema types (your server's typedefs)
     */
    'src/app/__generated__/types.server.ts': {
      plugins: ['typescript'],
    },
    /**
     * refers to the base directory of the  and it uses the
     * near-operation-file preset to generate a file per each operation found
     * under the 'documents' path
     *
     * this will generate our query/mutation/sub use-case and add it to eh respective directory
     * nxt to your query
     */
    'src/app/common': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '../__generated__/types.server.ts',
      },
      plugins: ['typescript-operations'],
      config: { withHooks: true },
    },
  },
};
export default config;
