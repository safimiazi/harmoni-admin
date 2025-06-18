"use client";
import React from "react";
import { Provider } from "react-redux";
import { persistors, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";

const ReduxProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistors}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProviderWrapper;
