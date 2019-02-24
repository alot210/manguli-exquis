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
      user_id: -1,
      room_id: -1,
      gameMode: -1,
      room_name: 'null',
      button_disabled: true
    };

    this.currentRoomRef = firebase.database().ref().child('room/'+this.props.navigation.getParam('roomID'));
    this.currentRoomContentRef = firebase.database().ref('roomContent/');
  }

  testfunction(_that) {
    let _roomID = _that.state.room_id;
    let roomMember = _that.currentRoomContentRef;
    roomMember.on('value', function (snapshot) {
      let data = [];
      snapshot.forEach(function (item) {
        if(item.child("roomID").val() === _roomID){
          data.push(item);
        }
      });
      _that.setState({number_of_players: data.length});

      if(data.length > 1){
          _that.setState({button_disabled: false});
      } else {
          _that.setState({button_disabled: true});
      }
    });
  }

  //Function to create on value change listener for navigating all users to GameStartScreen
  navigateToStartGame = () => {
    let currentRoom = firebase.database().ref().child('room/' + this.props.navigation.getParam('roomID'));
    currentRoom.on('value', (snapshot) => {
      let gameMode = snapshot.child('gameMode').val();
      //Navigate to GameStartScreen when gameMode is a value of Database
      if(gameMode !== "")
        this.props.navigation.navigate('GameStart', {
          room_id: this.state.room_id,
          user_id: this.props.navigation.getParam('userID'),
          number_of_players: this.state.number_of_players,
        });

    });
  };

  static navigationOptions = {
    //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
    drawerLabel: () => null,
  };

  componentWillMount() {

    this.currentRoomRef.once('value', (snapshot) => {
      this.setState({room_name: snapshot.child('name').val()});
    });

    //Call testfunction after change state completed for displaying right amount of room members
    this.setState({room_id: this.props.navigation.getParam('roomID', 0)}, () => {
      this.testfunction(this);
    });
    //Call function when component did mount to initialize on value change Listener for every room member
    this.navigateToStartGame();
  };

  componentWillUnmount() {
    this.currentRoomContentRef.off();
  }

  render() {
    const CreatorScreen = () => (
      <Container>
        <HeaderBar {...this.props} title='Dashboard'/>
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{paddingBottom: 20, alignSelf: 'center'}}>Im Raum: {this.state.room_name}</Text>
          <Text style={{alignSelf: 'center', paddingLeft: 16, paddingRight: 16}}>
            Es befinden sich momentan {"\n"}{this.state.number_of_players} Spieler in der Lobby.
          </Text>
          {this.state.number_of_players <= 1 ? <Text style={{alignSelf: 'center', paddingLeft: 16, paddingRight: 16}}>
            Es sind zu wenige Spieler um zu starten</Text>: null }
          <Text style={{alignSelf: 'center', paddingBottom: 32, paddingTop: 32}}>Spielmodus auswählen</Text>
          <Button primary style={{
            alignSelf: 'center',
            marginBottom: 10,
            width: 100
          }}
            disabled={this.state.button_disabled}
            onPress={ () => {
            //Write Gamemode into Database to call on Listener from navigateToGameStart() for navigating all room
            //members to GameStartScreen
            firebase.database().ref().child('room/' + this.props.navigation.getParam('roomID')).update({gameMode: 0});
          }}>
            <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Satz bilden</Text>
          </Button>
          <Button primary style={{
            alignSelf: 'center',
            marginBottom: 10,
            width: 100
          }}
            disabled={true}
            onPress={ () => this.props.navigation.navigate('GameStart')}>
            <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Reime bilden</Text>
          </Button>
          <Button primary style={{
            alignSelf: 'center',
            marginBottom: 10,
            width: 100
          }}
            disabled={true}
            onPress={ () => this.props.navigation.navigate('GameStart')}>
            <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Texte schreiben</Text>
          </Button>
        </SafeAreaView>
      </Container>

    );

    const JoinerScreen = () => (
      <Container>
        <HeaderBar {...this.props} title='Dashboard'/>
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{paddingBottom: 20, alignSelf: 'center'}}>Im Raum: {this.state.room_name}</Text>
          <Text style={{alignSelf: 'center', paddingBottom: 32, paddingLeft: 16, paddingRight: 16}}>
            Es befinden sich momentan {"\n"}{this.state.number_of_players} Spieler in der Lobby.
          </Text>
          <Text style={{alignSelf: 'center'}}>Warte bis der Spielleiter{"\n"}ein Spiel ausgesucht hat.</Text>
        </SafeAreaView>
      </Container>
    );

    if(this.props.navigation.getParam("creatorID") === this.props.navigation.getParam("userID"))
      return CreatorScreen();
    else
      return JoinerScreen();
  }
}