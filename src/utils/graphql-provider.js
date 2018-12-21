import { GraphQLClient } from 'graphql-request';

export const graphqlfetch = async (endpoint, query) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: 'Bearer MY_TOKEN',
    },
  });

  try {
    const data = await request(endpoint, query);
    // console.log((JSON.stringify(data, undefined, 2))
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
  }
};

// graphqlfetch.catch(error => console.error(error))
