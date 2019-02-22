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
      _that.setState({number_of_players: data.length});
    });
  }

  //Function to create on value change listener for navigating all users to GameStartScreen
  navigateToStartGame = () => {
    let currentRoom = firebase.database().ref().child('room/' + this.props.navigation.getParam('roomID'));
    currentRoom.on('value', (snapshot) => {
      let gameMode = snapshot.child('gameMode').val();
      //Navigate to GameStartScreen when gameMode is a value of Database
      if(gameMode !== null)
        this.props.navigation.navigate('GameStart', {
          room_id: this.state.room_id,
          user_id: this.props.navigation.getParam('userID'),
          number_of_players: this.state.number_of_players,
        });

    });
  };

  static navigationOptions = {
    //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
    drawerLabel: () => null
  };

  componentWillMount() {
    //Call testfunction after change state completed for displaying right amount of room members
    this.setState({room_id: this.props.navigation.getParam('roomID', 0)}, () => {
      this.testfunction(this);
    });
    //Call function when component did mount to initialize on value change Listener for every room member
    this.navigateToStartGame();
  };

  render() {
    const CreatorScreen = () => (
      <Container>
        <HeaderBar {...this.props} title='Dashboard'/>
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{alignSelf: 'center', paddingBottom: 32, paddingLeft: 16, paddingRight: 16}}>
            Es befinden sich momentan {this.state.number_of_players} Spieler in der Lobby.
          </Text>
          <Text style={{alignSelf: 'center', paddingBottom: 32}}>Spielmodus auswählen</Text>
          <Button primary style={{
            backgroundColor: Colors.secondaryColor,
            alignSelf: 'center',
            marginBottom: 10,
            width: 100
          }} onPress={ () => {
            //Write Gamemode into Database to call on Listener from navigateToGameStart() for navigating all room
            //members to GameStartScreen
            firebase.database().ref().child('room/' + this.props.navigation.getParam('roomID')).update({gameMode: 0});
          }}>
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

    );

    const JoinerScreen = () => (
      <Container>
        <HeaderBar {...this.props} title='Dashboard'/>
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{alignSelf: 'center', paddingBottom: 32, paddingLeft: 16, paddingRight: 16}}>
            Es befinden sich momentan {this.state.number_of_players} Spieler in der Lobby.
          </Text>
          <Text style={{alignSelf: 'center'}}>Warte bis der Spielleiter ein Spiel ausgesucht hat.</Text>
        </SafeAreaView>
      </Container>
    );

    if(this.props.navigation.getParam("creatorID") === this.props.navigation.getParam("userID"))
      return CreatorScreen();
    else
      return JoinerScreen();
  }
}