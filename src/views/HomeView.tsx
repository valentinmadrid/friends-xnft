import React, { FC, useCallback, useEffect, useState } from 'react';
import { PublicKey, Transaction } from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createTransferCheckedInstruction,
} from '@solana/spl-token';
import { View, Text, Button, List, ListItem, useNavigation } from 'react-xnft';
import supabase from '../../utils/supabase';
import AuthView from './Auth/AuthView';

const HomeView = () => {
  const navigation = useNavigation();
  const web3 = require('@solana/web3.js');
  const [friends, setFriends] = useState<any>();
  const [user, setUser] = useState<object>();
  const openSendScreen = (friend: any) => {
    navigation.push('SendView', { friend });
  };
  const loginToAccount = async () => {
    let { error } = await supabase.auth.signInWithPassword({
      email: 'valentin@incility.com',
      password: '1234test',
    });
    if (error) {
      console.log(error);
    } else {
      console.log('logged in with', supabase.auth.getUser());
      setUser(supabase.auth.getUser());
    }
  };

  useEffect(() => {
    setUser(supabase.auth.getUser());

    displayFriends();
  }, []);

  const displayFriends = async () => {
    const user = supabase.auth.getUser();

    const { data: friends, error } = await supabase
      .from('friends')
      .select(
        `
      id,
      to:friend_uuid(username, name, wallet_adress)`
      )
      .eq('owner_uuid', (await user).data.user?.id)
      .eq('status', 'true')
      .eq('accepted', 'true');

    if (error) {
      console.log(error);
    } else if (friends == null) {
      setFriends(null);
      return;
    } else {
      setFriends(friends);
      console.log(friends);
    }
  };

  const ConnectedView = () => {
    return (
      <View>
        <View style={{ margin: '20px' }}>
          <Text>Hello Valentin</Text>
          <Text>Your Friends:</Text>

          {friends ? (
            friends.map((friend: any) => {
              return (
                <ListItem key={friend.id}>
                  <View
                    style={{
                      backgroundColor: 'black',
                      padding: '5px',
                      marginTop: '10px',
                      // to do: corners
                      borderRadius: '10',
                    }}
                  >
                    <Text>{friend.to.name}</Text>
                    <Button
                      style={{ color: 'black' }}
                      onClick={() => openSendScreen(friend)}
                    >
                      Send
                    </Button>
                  </View>
                </ListItem>
              );
            })
          ) : (
            <Text>No friends</Text>
          )}
        </View>
      </View>
    );
  };

  return <ConnectedView />;
};
export default HomeView;
