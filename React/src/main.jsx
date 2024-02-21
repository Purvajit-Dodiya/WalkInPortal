import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./sass/index.css";
import { AuthProvider } from "./AuthProvider";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider, gql } from "@apollo/client";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get("walkInToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: "http://localhost:4000/",
//   cache: new InMemoryCache(),
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);
