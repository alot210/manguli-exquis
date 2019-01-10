import React from 'react';
import { StatusBar } from 'react-native';
import { Header, Left, Icon, Body, Title, Right } from 'native-base';

import Colors from "../constants/Colors";

export default class HeaderBar extends React.Component {
  render() {
    return (
      <Header style={{backgroundColor: Colors.primaryColor}}>
        <StatusBar barStyle='light-content'/>
        <Left>
          <Icon style={{color: Colors.primaryTextColor}} name="menu"
                onPress={() => this.props.navigation.openDrawer()}/>
        </Left>
        <Body style={{flex: 2}}>
        <Title style={{color: Colors.primaryTextColor, fontSize: 24}}>{this.props.title}</Title>
        </Body>
        <Right/>
      </Header>
    );
  }
}