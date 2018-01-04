import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ({ snapshot, onPress, onLongPress }) {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={{
        flexDirection: 'row',
        padding: 20,
      }}>
        <Text style={{
          width: 150
        }}>{snapshot.date}</Text>
        <Text>{snapshot.amount}</Text>
      </View>
    </TouchableOpacity>
  );
};