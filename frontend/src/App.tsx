
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import SimpleNavigator from './navigation/SimpleNavigator';

const App = () => {
  return (
    <AuthProvider>
      <SimpleNavigator />
    </AuthProvider>
  );
};

export default App;
    