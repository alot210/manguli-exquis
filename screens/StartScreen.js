import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { Header, Left, Right, Icon, Body, Title, Container, Content, Text, Button } from 'native-base';

import Colors from "../constants/Colors";
import HeaderBar from "../components/HeaderBar";

export default class StartScreen extends React.Component {
  // static navigationOptions = {
  //   //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
  //   drawerLabel: () => null
  // };

  render() {
      return (
          <Container>
            <HeaderBar {...this.props} title='Lobby'/>
            <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{alignSelf: 'center', paddingBottom: 32}}>Erstelle oder trete einen Raum bei!</Text>
              <Button primary style={{
                backgroundColor: Colors.secondaryColor,
                alignSelf: 'center',
                marginBottom: 10,
                width: 100
              }} onPress={ () => this.props.navigation.navigate('CreateRoom')}>
                <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Erstellen</Text>
              </Button>
              <Button primary style={{
                backgroundColor: Colors.secondaryColor                                                                                                 ,
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
