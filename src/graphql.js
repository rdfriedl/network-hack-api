import { Router } from "express";
import { graphql, getIntrospectionQuery } from "graphql";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import expressPlayground from "graphql-playground-middleware-express";
import { getGraphQLProjectConfig } from "graphql-config";

import resolvers from "./resolvers/index";

const IS_DEV = process.env.NODE_ENV === "development";
const config = getGraphQLProjectConfig();

const typeDefs = config.getSchemaSDL();
const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

const router = new Router();

router.use(
	"/graphql",
	graphqlExpress({
		schema,
		tracing: IS_DEV
	})
);
router.get("/schema", (req, res) => {
	graphql(schema, getIntrospectionQuery())
		.then(schemaJSON => {
			res.status(200).json(schemaJSON);
		})
		.catch(err => {
			res.status(500).json({
				type: err.type,
				message: err.message
			});
		});
});
router.get("/playground", expressPlayground({ endpoint: "/graphql" }));
router.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

export default router;
