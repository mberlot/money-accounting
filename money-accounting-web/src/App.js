import './App.css';
import React from "react";
import { store, persistor } from './configs/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Home from './components/home';

function App() {
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div className="App">
                  <Home/>
            </div>
          </PersistGate>
      </Provider>
  );
}

export default App;
