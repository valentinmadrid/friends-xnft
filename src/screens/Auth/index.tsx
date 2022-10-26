import { Stack } from 'react-xnft';
import React from 'react';
import AuthView from '../../views/Auth/AuthView';
import StartProfileView from '../../views/Auth/StartProfileView';

const AuthScreen = () => {
  return (
    <Stack.Navigator
      initialRoute={{ name: 'AuthView' }}
      options={({ route }) => {
        switch (route.name) {
          case 'AuthView':
            return {
              title: 'Auth View',
            };
          case 'StartProfileView':
            return {
              title: 'StartProfile View',
            };

          default:
            throw new Error('unknown route');
        }
      }}
    >
      <Stack.Screen
        name={'AuthView'}
        component={(props: any) => <AuthView {...props} />}
      />
      <Stack.Screen
        name={'StartProfileView'}
        component={(props: any) => <StartProfileView {...props} />}
      />
    </Stack.Navigator>
  );
};

export default AuthScreen;
