import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { StoreProvider } from "./stores";
import AppContainer from "./container/AppContainer";

export default function() {
  return (
    <StoreProvider>
      <AppContainer />
    </StoreProvider>
  );
}
