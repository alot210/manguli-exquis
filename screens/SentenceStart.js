import React from 'react';
import { View } from 'react-native';
import { Container, Text, Button} from 'native-base';
import firebase from '../constants/FirebaseConfig';

import HeaderBar from '../components/HeaderBar';

export default class SentenceStart extends React.Component {
  /*static navigationOptions = {
    //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
    drawerLabel: () => null
  };*/

  // gameLogic(_that) {
  //   //Alle Eingaben der User in Firebase eintragen!
  //   let room = firebase.database().ref().child('/room/' + _that.props.navigation.getParam('room_id'));
  //   let number_of_players = _that.props.navigation.getParam('number_of_players');
  //   let sequence = [];
  //
  //   room.on('value', function (snapshot) {
  //     console.log(snapshot);
  //     sequence = snapshot.child('roomMember').val();
  //     _that.shuffleArray(sequence);
  //     for(let i = 0; i < sequence.length; i++) {
  //       console.log(sequence[i]);
  //     }
  //   });
  //
  // }

  constructor(props) {
    super(props);

    this.state = {
      allPlayerReady: false,
      readyPlayers: 0,
      disabledButton: false,
      readyPlayersAmount: 0,
    };

    this.currentRoom = firebase.database().ref().child('room/'+this.props.navigation.getParam('room_id'));
  }

  onValueChanged = () => {
    //Set State FOR EVERY PLAYER in the current room
    this.setState({readyPlayersAmount: this.getReadyPlayerAmount()});
    //Navigate ALL PLAYERS to the next screen when ALL PLAYERS are ready
    if (this.getReadyPlayerAmount() === this.props.navigation.getParam('number_of_players')) {
      this.props.navigation.navigate('GameInput', {
        room_id: this.props.navigation.getParam('room_id'),
        user_id: this.props.navigation.getParam('user_id'),
      });
    }
  };

  //Create an on value change listener FOR EVERY PLAYER in the current room
  componentWillMount() {
    this.currentRoom.on('value', this.onValueChanged);
  }

  componentWillUnmount() {
    this.currentRoom.off('value', this.onValueChanged);
  }

  //Function for setting the amount of players who are ready to play into the database and disable button
  gameStart = () => {
    this.currentRoom.update({readyPlayersAmount: this.getReadyPlayerAmount() + 1});
    this.setState({disabledButton: true});
  };

  //Function for getting the amount of players who are ready to play from the database
  getReadyPlayerAmount = () => {
    let readyPlayerAmount = 0;
    this.currentRoom.on('value', (snapshot) => {
      if(snapshot.hasChild('readyPlayersAmount'))
        readyPlayerAmount = snapshot.child('readyPlayersAmount').val();
    });
    return readyPlayerAmount;
  };

  render() {
    return (
      <Container>
        <HeaderBar {...this.props} title='Satzbau'/>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 64}}>
          <Text style={{alignSelf: 'center', paddingBottom: 32}}>Satzbau</Text>
          <Text style={{alignSelf: 'center', paddingBottom: 32, paddingLeft: 16, paddingRight: 16}}>
            Gespielt wird mit einem festen Satzschema. Jeder erhält ein einen zufälligen Teil des Schemas
            (Prädikat, Subjekt etc.) und muss dazu ein passendes Wort abschicken. Nachdem alle Mitspieler
            ihr Wort abgeschickt haben, wird der zufällige Satz zusammengesetzt und für alle Ausgegeben.
          </Text>
          <Text style={{paddingLeft: 16, paddingRight: 16}}>
             {this.state.readyPlayersAmount} von {this.props.navigation.getParam('number_of_players')} Spielern sind
             bereit. Warte bis alle Spieler bereit sind.
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Button
            style={{alignSelf: 'center'}}
            onPress={ () => this.gameStart()}
            disabled={this.state.disabledButton}>
            <Text>Starten Jetzt</Text>
          </Button>
        </View>
      </Container>
    )
  }
}