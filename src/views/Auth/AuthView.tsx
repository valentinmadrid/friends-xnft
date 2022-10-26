import { View, Text, TextField, Button, useNavigation } from 'react-xnft';
import React, { useEffect, useState } from 'react';
import supabase from '../../../utils/supabase';
const AuthView = () => {
  const [email, setEmail] = useState<string>('');
  const [waitForConfirmation, setWaitForConfirmation] =
    useState<boolean>(false);
  const navigation = useNavigation();
  const refreshPage = () => {
    window.location.reload();
  };

  const signInWithEmail = async () => {
    let { error } = await supabase.auth.signInWithOtp({
      email: email,
    });
    if (error) {
      console.log(error);
    } else {
      console.log('success');
      setWaitForConfirmation(true);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const user = supabase.auth.getUser();
      if ((await user).data.user) {
        navigation.push('StartProfileView');
      }
    };
    getUser();
  }, []);

  return !waitForConfirmation ? (
    <View style={{ margin: '5px' }}>
      <Text>Welcome! Let's get you up and running</Text>
      <TextField
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.data.value)}
        type='email'
      />
      <Button style={{ color: 'black' }} onClick={signInWithEmail}>
        Send me a LogIn Link!
      </Button>
    </View>
  ) : (
    <View style={{ margin: '5px' }}>
      <Text>Waiting for confirmation...</Text>
      <Button onClick={refreshPage}>Refresh</Button>
    </View>
  );
};

export default AuthView;
