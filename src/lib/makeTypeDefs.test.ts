import 'jest';
import { GraphQLSchema, buildSchema } from 'graphql';
import { generateTsFromGql, getTypeDefs} from './makeTypeDefs';
import * as prettyFormat from 'pretty-format';

describe('gql Types to Typescript types', () => {

    it('should return merged typedefs', async () => {
        const typeDefs = await getTypeDefs('**/*.gql');
        expect(prettyFormat(typeDefs)).toMatchSnapshot();
    });
    it('merged types should be convertable to a GraphQLSchema', async () => {
        const typeDefs = await getTypeDefs('**/*.gql');
        expect(buildSchema(typeDefs)).toBeInstanceOf(GraphQLSchema);
    });
    it.skip('should work with types with comments', async () => {
        // currently doesnt work with comments in the query type sections of schema
        const typeDefsWithComments =  await getTypeDefs('**/*.gql');
        expect(buildSchema(typeDefsWithComments)).toBeInstanceOf(GraphQLSchema);
        expect(prettyFormat(typeDefsWithComments)).toMatchSnapshot();
    });
    it ('End to End test: should create typescript types from graphql files', async () => {
        const tsTypesNameSpace = await generateTsFromGql({globPattern: '**/*.gql'});
        expect(prettyFormat(tsTypesNameSpace)).toMatchSnapshot();
    });
});
