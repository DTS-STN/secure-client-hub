import { gql, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const link = new HttpLink({
  uri: process.env.AEM_GRAPHQL_ENDPOINT,
  headers: {
    'User-Agent': 'secure-client-hub/0.0.1',
  },
})

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

export default async function (AEMQuery) {
  return client.query({
    query: gql`
      ${AEMQuery}
    `,
  })
}
