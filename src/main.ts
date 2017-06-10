import * as bodyParser from 'body-parser';
import compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import {
  graphiqlExpress,
  graphqlExpress
} from 'graphql-server-express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import createSchema from './schema';

// Default port or given one.
export const GRAPHQL_ROUTE = '/graphql';
export const GRAPHIQL_ROUTE = '/graphiql';

export interface IMainOptions {
  enableCors: boolean;
  enableGraphiql: boolean;
  env: string;
  port: number;
  verbose ?: boolean;
}

/* istanbul ignore next: no need to test verbose print */
function verbosePrint(port, enableGraphiql) {
  console.log(`GraphQL Server is now running on http://localhost:${port}${GRAPHQL_ROUTE}`);
  if (true === enableGraphiql) {
    console.log(`GraphiQL Server is now running on http://localhost:${port}${GRAPHIQL_ROUTE}`);
  }
}

const graphqlMiddleware = [
  bodyParser.json(),
  bodyParser.text({
    type: 'application/graphql'
  }),
  // tslint:disable-next-line:variable-name
  (req, _res, next) => {
    if (req.is('application/graphql')) {
      req.body = {
        query: req.body
      };
    }
    next();
  }
];

export async function main(options: IMainOptions) {
  const app = express();

  app.use(helmet());

  app.use(morgan(options.env));

  if (true === options.enableCors) app.use(GRAPHQL_ROUTE, cors());

  if (options.env === 'production') app.use(compression);

  try {
    const schema = await createSchema();
    app.use(GRAPHQL_ROUTE, ...graphqlMiddleware, graphqlExpress({
      ...schema
    }));
    if (true === options.enableGraphiql) {
      app.use(GRAPHIQL_ROUTE, graphiqlExpress({
        endpointURL: GRAPHQL_ROUTE
      }));
    }
    return new Promise((resolve) => {
      const server = app.listen(options.port, () => {
        /* istanbul ignore if: no need to test verbose print */
        if (options.verbose) {
          verbosePrint(options.port, options.enableGraphiql);
        }
        resolve(server);
      }).on('error', (err: Error) => {
        console.error(err);
      });
    });
  } catch (error) {
    if (error) console.error(error);
  }
}

/* istanbul ignore if: main scope */
// for testing purposes. during testing its required as a module and hence the code below wont run
if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  // Either to export GraphiQL (Debug Interface) or not.
  const NODE_ENV = process.env.NODE_ENV !== 'production' ? 'dev' : 'production';

  const EXPORT_GRAPHIQL = NODE_ENV !== 'production';

  // Enable cors (cross-origin HTTP request) or not.
  const ENABLE_CORS = NODE_ENV !== 'production';

  main({
      enableCors: ENABLE_CORS,
      enableGraphiql: EXPORT_GRAPHIQL,
      env: NODE_ENV,
      port: PORT,
      verbose: true,
    });
}
