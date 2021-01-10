import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';

const link = from([
    new HttpLink({
    // @ts-ignore
    uri: 'http:/10.0.2.2:8000/graphql',
	
  }),
  
]);

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});


