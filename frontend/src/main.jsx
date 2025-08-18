// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { NhostProvider } from "@nhost/react";
import nhost from "./nhost";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </NhostProvider>
  </React.StrictMode>
);