import React from 'react';
import { View, Text } from 'react-native';

export const StatsCol = ({items}) => (
  <View style={{ flexDirection: 'row' }}>
    {items.map( (item, index) => <View 
      style={{
        flex:1, 
        height: 60, 
        backgroundColor: '#eee', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderLeftWidth: index == 0 ? 0 : 1}}
      key={item.title}
      >
        <Text style={{ fontSize: 20, textAlign: 'center', color: '#555' }}>{item.title}</Text>,
        <Text style={{ fontSize: 14, textAlign: 'center', color: '#888' }}>{item.description}</Text>
      </View>)}
  </View>
)