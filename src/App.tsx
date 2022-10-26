import ReactXnft, {
  Button,
  Stack,
  Tab,
  Text,
  TextField,
  View,
} from 'react-xnft';
import HomeView from './views/HomeView';
import React, { useEffect, useState } from 'react';
import ProfileView from './views/ProfileView';
import supabase from '../utils/supabase';
import FriendsView from './views/FriendsView';
import HomeScreen from './screens/Home';
import AuthView from './views/Auth/AuthView';
import AuthScreen from './screens/Auth';
//
// On connection to the host environment, warm the cache.
//
ReactXnft.events.on('connect', () => {});

export function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>();
  const [userName, setUserName] = useState<string>();
  const [userUsername, setUserUsername] = useState<string>();
  const [userWallet, setUserWallet] = useState<string>();
  useEffect(() => {
    const user = supabase.auth.getUser();
    const getUser = async () => {
      setUser((await user).data.user);
      setLoading(false);
    };
    const getProfile = async () => {
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('username, name, wallet_adress')
        .eq('id', (await user).data.user?.id)
        .single();
      if (error) {
        console.log(error);
      } else {
        setUserName(userProfile.name);
        setUserUsername(userProfile.username);
        setUserWallet(userProfile.wallet_adress);
        console.log('userProfile:', userProfile);
      }
    };
    getUser();
    getProfile();
  }, []);

  return user && userName && userUsername && userWallet ? (
    <View style={{ height: '100%', backgroundColor: 'blue' }}>
      <Tab.Navigator
        style={{
          backgroundColor: 'black',
          borderTop: 'none',
        }}
        options={({ route }) => {
          return {
            tabBarIcon: () => {
              if (route.name === 'Home') {
                return <Tab.Icon element={undefined} />;
              } else if (route.name === 'Profile') {
                return <Tab.Icon element={undefined} />;
              }
            },
          };
        }}
      >
        <Tab.Screen
          name='Home'
          disableLabel={false}
          component={() => <HomeScreen />}
        />
        <Tab.Screen
          name='Friends'
          disableLabel={false}
          component={() => <FriendsView />}
        />
        <Tab.Screen
          name='Profile'
          disableLabel={false}
          component={() => <ProfileView />}
        />
      </Tab.Navigator>
    </View>
  ) : (
    <View style={{ backgroundColor: 'blue', height: '100%' }}>
      <AuthScreen />
    </View>
  );
}
