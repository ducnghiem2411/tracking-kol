import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { PORT } from "../config";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs/schema";

export const initGraphQLServer = async () => {
    try {
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
            debug: true,
      });
      const { url } = await server.listen({ port: PORT });
      console.log(`🚀 Apollo server ready at ${url}`);
    } catch (e) {
      throw e;
    }
  };