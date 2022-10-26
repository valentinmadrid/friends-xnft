import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextField, List, ListItem } from 'react-xnft';
import supabase from '../../utils/supabase';

const FriendsView = () => {
  const [user, setUser] = React.useState<any>();
  const [friendInput, setFriendInput] = React.useState<String>('');
  const [friends, setFriends] = React.useState<any>();
  const [friendRequests, setFriendRequests] = React.useState<any>();

  useEffect(() => {
    displayFriends();
    getFriendRequests();
  }, []);

  const displayFriends = async () => {
    const user = supabase.auth.getUser();

    const { data, error } = await supabase
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
    }
    console.log('friends:', data);
    setFriends(data);
  };

  const getFriendRequests = async () => {
    const user = supabase.auth.getUser();

    const { data, error } = await supabase
      .from('friends')
      .select(
        `
        id,
        to:friend_uuid(username, name, wallet_adress)`
      )
      .eq('receiver_uuid', (await user).data.user?.id)
      .eq('status', 'false')
      .eq('accepted', 'false');

    if (error) {
      console.log(error);
    }
    console.log('friends:', data);
    setFriendRequests(data);
  };

  const addFriend = async () => {
    const { data: friend_uuid, error: friend_error } = await supabase
      .from('users')
      .select('id')
      .eq('username', friendInput);

    if (friend_uuid == null) {
      return;
    } else if (friend_error) {
      console.log(friend_error);
    }

    console.log('friend uuid: ', friend_uuid);

    const { data: add_friend, error: add_error } = await supabase
      .from('friends')
      .insert([
        {
          owner_uuid: 'aa7c62c8-da27-4891-a1f6-df210a883f5f',
          friend_uuid: friend_uuid[0].id,
          accepted: true,
          status: true,
        },
      ]);
    if (add_error) {
      console.log(add_error);
    }
  };
  return (
    <View>
      <View style={{ height: '60px', backgroundColor: 'blue' }}>
        <Text>Logo here</Text>
      </View>
      <View style={{ margin: '20px' }}>
        <TextField
          onChange={(e) => setFriendInput(e.data.value)}
          placeholder='Add friends'
        />
        <Button style={{ color: 'black' }} onClick={addFriend}>
          Request
        </Button>
        <Text>Your Friends:</Text>
        <List>
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
                    <Button style={{ color: 'black' }}>Profile</Button>
                  </View>
                </ListItem>
              );
            })
          ) : (
            <Text>No friends</Text>
          )}
        </List>
        <Text style={{ marginTop: '25px' }}>Friend Requests</Text>
        <List>
          {friendRequests ? (
            friendRequests.map((request: any) => {
              return (
                <ListItem key={request.id}>
                  <View
                    style={{
                      backgroundColor: 'black',
                      padding: '5px',
                      marginTop: '10px',
                      // to do: corners
                      borderRadius: '10',
                    }}
                  >
                    <Text>{request.to.name}</Text>
                    <Button style={{ color: 'black' }}>Profile</Button>
                  </View>
                </ListItem>
              );
            })
          ) : (
            <Text>No friend Requests</Text>
          )}
        </List>
      </View>
    </View>
  );
};

export default FriendsView;
