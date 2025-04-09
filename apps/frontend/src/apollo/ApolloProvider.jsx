// src/apollo/ApolloProvider.jsx
import React from "react";
import { ApolloProvider as Provider } from "@apollo/client";
import client from "./client";

export default function ApolloWrapper({ children }) {
  return <Provider client={client}>{children}</Provider>;
}
