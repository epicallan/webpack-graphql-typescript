
import { GraphQLSchema} from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers } from 'merge-graphql-schemas';
import { getTypeDefs } from '../lib/makeTypeDefs';
import db from './example/db';

const resolverFiles = (require as any).context('./', true, /resolver\.ts/);
const modelFiles = (require as any).context('./', true, /model\.ts/);

// get graphql resolver objects
const resolversLoad: any[] = resolverFiles.keys()
    .map(moduleName => resolverFiles(moduleName).default);

const resolvers = resolversLoad.length > 1
    ? mergeResolvers(resolversLoad) : resolversLoad[0];

// create context objects
const exampleModels = modelFiles.keys()
    .reduce((allModels, moduleName) => {
        const modelModule = modelFiles(moduleName).default;
        const instatiatedModel = new modelModule(db);
        const className = instatiatedModel.constructor.name.toLowerCase();
        return {...allModels, [className]: instatiatedModel};
    }, {});

const createSchema = async (): Promise<any> => {
    const typeDefs = await getTypeDefs();
    const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });
    return { schema, context: {...exampleModels} };
};

export default createSchema;
