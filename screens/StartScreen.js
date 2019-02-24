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
      let _userId = this.props.navigation.getParam('userID', 0);
      return (
          <Container>
            <HeaderBar {...this.props} title='Lobby'/>
            <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{alignSelf: 'center', paddingBottom: 32, fontSize: 24, textAlign: 'center'}}>Erstelle oder trete einem Raum bei!</Text>
              <Button primary style={{
                backgroundColor: Colors.secondaryColor,
                alignSelf: 'center',
                marginBottom: 10,
                width: 200
              }} onPress={ () => this.props.navigation.navigate('CreateRoom', {userID: _userId})}>
              <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Erstellen</Text>
              </Button>
              <Button primary style={{
                backgroundColor: Colors.secondaryColor                                                                                                 ,
                alignSelf: 'center',
                marginBottom: 10,
                width: 200
              }} onPress={ () => this.props.navigation.navigate('JoinRoom', {userID: _userId})}>
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
