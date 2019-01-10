import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { Header, Left, Right, Icon, Body, Title, Container, Content, Text, Button } from 'native-base';

import Colors from "../constants/Colors";

export default class StartScreen extends React.Component {
  static navigationOptions = {
    //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
    drawerLabel: () => null
  };
  render() {
      return (
          <Container>
            <Header style={{backgroundColor: Colors.primaryColor}}>
                <StatusBar barStyle='light-content'/>
                <Left>
                    <Icon style={{color: Colors.primaryTextColor}} name="menu" onPress={()=> this.props.navigation.openDrawer()}/>
                </Left>
                <Body style={{flex: 2}}>
                <Title style={{color: Colors.primaryTextColor, fontSize: 24}}>Lobby</Title>
                </Body>
                <Right/>
            </Header>
            <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{alignSelf: 'center', paddingBottom: 32}}>Wollen Sie einen Raum erstellen oder beitreten?</Text>
              <Button primary style={{
                backgroundColor: Colors.primaryColor,
                alignSelf: 'center',
                marginBottom: 10,
                width: 100
              }} onPress={ () => this.props.navigation.navigate('CreateRoom')}>
                <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Erstellen</Text>
              </Button>
              <Button primary style={{
                backgroundColor: Colors.primaryColor,
                alignSelf: 'center',
                marginBottom: 10,
                width: 100
              }} onPress={ () => this.props.navigation.navigate('JoinRoom')}>
                <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Beitreten</Text>
              </Button>
            </SafeAreaView>
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
