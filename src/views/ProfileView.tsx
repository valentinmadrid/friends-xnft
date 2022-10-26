import { View, Text, Button, TextField } from 'react-xnft';
import React, { useState, useEffect } from 'react';
import supabase from '../../utils/supabase';
import { useUser } from '../../context/userContext';

const ProfileView = () => {
  const [user, setUser] = useState<any>();
  // Load Stuff on render
  useEffect(() => {
    userState();
  }, []);

  const userState = async () => {
    const user = supabase.auth.getUser();
    setUser((await user).data.user);
  };

  return (
    <View>
      <View style={{ height: '60px', backgroundColor: 'blue' }}>
        <Text>Logo here</Text>
      </View>
      <View>
        <Text>My profile</Text>
        <Text>My email adress: {user?.email}</Text>
        <Button onClick={() => supabase.auth.signOut()}>Log out</Button>
      </View>
    </View>
  );
};
export default ProfileView;
