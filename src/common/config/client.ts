
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { SetContextLink } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const httpLink = new HttpLink({
  // uri: "http://localhost:3000/graphql", // your API endpoint
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT ,
/*   useGETForQueries: true, */
  // credentials: "include", // optional if your API uses cookies
});


const authLink = new SetContextLink((prevContext, operation) => {
  const token = Cookies.get("authToken"); 
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;