import React from 'react';
import {View, Text, Platform} from 'react-native';
import Colors from "../constants/Colors";
import { Icon } from 'expo';


export class Header extends React.Component {
  render() {
    return (
      <View style={[{height: 56}, {backgroundColor: Colors.primaryColor}, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
        <Icon.Ionicons
          name={Platform.OS === 'ios' ? `ios-menu` : 'md-menu'}
          color={Colors.primaryTextColor}
          size={32}
          style={{left: 16}}
        />
        <Text style={[{color: Colors.primaryTextColor}, {fontSize: 24}]}>Manguli Exquis</Text>
        <Icon.Ionicons
          name={Platform.OS === 'ios' ? 'ios-help' : 'md-help'}
          color={Colors.primaryTextColor}
          size={48}
          style={{right: 16}}
        />
      </View>
    );
  }
}