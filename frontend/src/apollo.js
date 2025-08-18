import { ApolloClient, InMemoryCache, createHttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import nhost from "./nhost";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT,
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const token = await nhost.auth.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  } catch (error) {
    console.error("Error getting access token:", error);
    return { headers };
  }
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_HASURA_GRAPHQL_WS,
    connectionParams: async () => {
      const token = await nhost.auth.getAccessToken();
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === "OperationDefinition" && def.operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

// Define a custom cache merge policy for subscriptions
const cache = new InMemoryCache({
  typePolicies: {
    Subscription: {
      fields: {
        messages: {
          // Merge function to handle subscription updates
          merge(existing = [], incoming = []) {
            return [...existing, ...incoming];
          },
        },
      },
    },
    // Ensure each Message has a unique identifier
    Message: {
      keyFields: ["id"], // Assuming 'id' is the unique key
    },
  },
});

export const client = new ApolloClient({
  link: splitLink,
  cache, // Use the custom cache configuration
  connectToDevTools: true, // Helps with debugging
});