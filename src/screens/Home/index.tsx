import { Stack } from 'react-xnft';
import React from 'react';
import AuthView from '../../views/Auth/AuthView';
import DisplayProfileView from '../../views/DisplayProfileView';
import SendView from '../../views/SendView';
import HomeView from '../../views/HomeView';

const HomeScreen = () => {
  return (
    <Stack.Navigator
      initialRoute={{ name: 'HomeView' }}
      options={({ route }) => {
        switch (route.name) {
          case 'HomeView':
            return {
              title: 'Home View',
            };
          case 'SendView':
            return {
              title: 'Send View',
            };
          case 'DisplayProfileView':
            return {
              title: 'Display Profile View',
            };
          case 'AuthView':
            return {
              title: 'Auth View',
            };
          default:
            throw new Error('unknown route');
        }
      }}
    >
      <Stack.Screen
        name={'HomeView'}
        component={(props: any) => <HomeView {...props} />}
      />
      <Stack.Screen
        name={'SendView'}
        component={(props: any) => <SendView {...props} />}
      />
      <Stack.Screen
        name={'DisplayProfileView'}
        component={(props: any) => <DisplayProfileView {...props} />}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;
