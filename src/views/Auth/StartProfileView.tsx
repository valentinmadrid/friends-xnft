import { View, Text, TextField, Button, useNavigation } from 'react-xnft';
import React, { useEffect, useState } from 'react';
import supabase from '../../../utils/supabase';
const StartProfileView = () => {
  const [name, setName] = useState<String>('');
  const [username, setUsername] = useState<String>('');
  const [user, setUser] = useState<any>();
  const navigation = useNavigation();

  useEffect(() => {
    const getUser = async () => {
      const user = supabase.auth.getUser();
      if ((await user).data.user === null) {
        navigation.push('AuthView');
      } else {
        setUser((await user).data.user);
      }
    };
    getUser();
  }, []);

  const updateProfile = async () => {
    const user = supabase.auth.getUser();
    const id = (await user).data.user?.id;
    console.log('id is ', id);
    // @ts-ignore
    const wallet_adress = window.xnft.solana.publicKey;
    const { data, error } = await supabase
      .from('users')
      .update({ name: name, username: username, wallet_adress: wallet_adress })
      .eq('id', id);

    if (error) {
      console.log(error);
      return;
    } else {
      window.location.reload();
    }
    console.log(data);
    window.location.reload();
  };

  return (
    <View style={{ margin: '5px' }}>
      <Text>Great! Let's get our last details in here</Text>
      <Text>Enter </Text>
      <TextField
        placeholder='Enter Name'
        onChange={(e) => setName(e.data.value)}
      />
      <TextField
        placeholder='Choose a username'
        onChange={(e) => setUsername(e.data.value)}
      />
      <Button style={{ color: 'black' }} onClick={updateProfile}>
        Create Profile
      </Button>
    </View>
  );
};

export default StartProfileView;
