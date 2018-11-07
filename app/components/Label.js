import React from 'react';
import { View, Text } from 'react-native';

export const Label = ({text, color}) => (
  <View style={{
    ...style.badge,
    ...(color && {backgroundColor: color}),
  }}>
    <Text style={style.badge_text}>{text}</Text>
  </View>
)
const style = {
  badge: {
    backgroundColor: 'red',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 4,
  },
  badge_text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
}