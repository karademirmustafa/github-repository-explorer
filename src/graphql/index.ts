import { ApolloClient, InMemoryCache } from "@apollo/client";
// const token = process.env.REACT_APP_GITHUB_GRAPHQL_API_TOKEN;

export const apolloClient = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: { authorization: `Bearer ${""}` },
    cache: new InMemoryCache()
})
