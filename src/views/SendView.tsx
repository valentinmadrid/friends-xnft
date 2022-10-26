import { View, Text, Button, TextField } from 'react-xnft';
import React, { useState } from 'react';
import { PublicKey, Transaction } from '@solana/web3.js';

const sendView = ({ friend }) => {
  const [amount, setAmount] = useState<number>();
  const send = async () => {
    // TO DO: Make a real user to user tx here
    const tx = new Transaction();
    // @ts-ignore
    const signature = await window.xnft.solana.send(tx);
    console.log(signature);
  };

  return (
    <View style={{ height: '100%' }}>
      <View style={{ margin: '10px' }}>
        <Text>Send SPL Token To:</Text>
        <Text>Name: {friend.to.name}</Text>
        <Text>Username: {friend.to.username}</Text>
        <TextField
          type='number'
          placeholder='Enter Amount in SOL'
          onChange={(e) => setAmount(e.data.value)}
        />
        <Button onClick={send} style={{ color: 'black' }}>
          Send
        </Button>
      </View>
    </View>
  );
};

export default sendView;
