import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux"
import DCandidates from './components/DCandidates';
import { Container } from '@material-ui/core';
import React from "react";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <Provider store = {store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <DCandidates/>
        </Container>
      </ToastProvider>
    </Provider>
  );
}

export default App;
