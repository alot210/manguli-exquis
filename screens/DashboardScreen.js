import React from 'react';
import HeaderBar from "../components/HeaderBar";
import Colors from "../constants/Colors";
import { View, Alert } from 'react-native';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { Container, Content, Form, Label, Input, Item, Button, Text } from 'native-base';
import firebase from '../constants/FirebaseConfig';

export default class DashboardScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          number_of_players: 0,
          user_id: 1,
          room_id: 1
      }
  }

  testfunction(_that) {

      let _roomID = _that.state.room_id;
      let roomMember = firebase.database().ref('roomContent/');
      roomMember.on('value', function (snapshot) {
          let data = [];
          snapshot.forEach(function (item) {
            if(item.child("roomID").val() === _roomID){
                data.push(item);
            }
          });
          //this.state.number_of_players = data.length;
          //console.log("Spieler im Raum "+ _that.state.room_id +": "+data.length);
          _that.setState({number_of_players: data.length});
      });
  }

  static navigationOptions = {
    //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
    drawerLabel: () => null
  };

  componentWillMount() {
    this.setState({room_id: this.props.navigation.getParam('roomID', 0)});
    this.testfunction(this);
  }

  render() {
    return (
      <Container>
        <HeaderBar {...this.props} title='Dashboard'/>
        <Input value={this.state.number_of_players+" "}  />
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{alignSelf: 'center', paddingBottom: 32}}>Spielmodus auswählen</Text>
          <Button primary style={{
              backgroundColor: Colors.secondaryColor,
              alignSelf: 'center',
              marginBottom: 10,
              width: 100
              }} onPress={ () => this.props.navigation.navigate('GameStart')}>
            <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Satz bilden</Text>
          </Button>
          <Button primary style={{
              backgroundColor: Colors.secondaryColor,
              alignSelf: 'center',
              marginBottom: 10,
              width: 100
              }} onPress={ () => this.props.navigation.navigate('GameStart')}>
          <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Reime bilden</Text>
          </Button>
          <Button primary style={{
              backgroundColor: Colors.secondaryColor                                                                                                 ,
              alignSelf: 'center',
              marginBottom: 10,
              width: 100
              }} onPress={ () => this.props.navigation.navigate('GameStart')}>
          <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Texte schreiben</Text>
          </Button>
      </SafeAreaView>
      </Container>
    )
  }
}