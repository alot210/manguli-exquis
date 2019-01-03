import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from "../constants/Colors";
import { StatusBar } from 'react-native';
import { Header, Left, Right, Icon, Body, Title, Container } from 'native-base';

export default class TutorialScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header style={{backgroundColor: Colors.primaryColor}}>
          <StatusBar barStyle='light-content'/>
          <Left>
            <Icon style={{color: Colors.primaryTextColor}} name="menu" onPress={()=>this.props.navigation.openDrawer()}/>
          </Left>
          <Body style={{flex: 2}}>
          <Title style={{color: Colors.primaryTextColor, fontSize: 24}}>Manguli Exquis</Title>
          </Body>
          <Right/>
        </Header>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
