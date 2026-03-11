import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from '../../state/index.tsx';
import AppRouter from '../../router/AppRouter.tsx';

const App = () => {
  return (
    <ContextProvider>
      <BrowserRouter basename='/raffle-picker'>
        <AppRouter />
      </BrowserRouter>
    </ContextProvider>
  );
};

export default App;
