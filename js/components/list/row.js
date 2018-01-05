import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ({ title, value, onPress, onLongPress }) {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={{
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 20,
      }}>
        <Text>{title}</Text>
        <Text>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};