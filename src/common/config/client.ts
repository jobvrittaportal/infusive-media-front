// src/api/apolloClient.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { SetContextLink } from "@apollo/client/link/context";
import Cookies from "js-cookie";

// 1️⃣ HttpLink (replaces deprecated createHttpLink)
const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql", // your API endpoint
  // credentials: "include", // optional if your API uses cookies
});

// 2️⃣ Auth link (replaces deprecated setContext)
const authLink = new SetContextLink((prevContext, operation) => {
  const token = Cookies.get("authToken"); // or localStorage.getItem("authToken")
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// 3️⃣ Combine links
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
