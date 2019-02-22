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

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

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
  }

  //Create an on value change listener FOR EVERY PLAYER in the current room
  componentWillMount() {
    let currentRoom = firebase.database().ref().child('room/'+this.props.navigation.getParam('room_id'));
    currentRoom.on('value', () => {
      //Set State FOR EVERY PLAYER in the current room
      this.setState({readyPlayersAmount: this.getReadyPlayerAmount()});
      //Navigate ALL PLAYERS to the next screen when ALL PLAYERS are ready
      if(this.getReadyPlayerAmount() === this.props.navigation.getParam('number_of_players')) {
        this.props.navigation.navigate('GameInput');
      }
    });
  }

  //Function for setting the amount of players who are ready to play into the database and disable button
  gameStart = () => {
    firebase.database().ref().child('room/'+this.props.navigation.getParam('room_id')).update({readyPlayersAmount: this.getReadyPlayerAmount() + 1});
    this.setState({disabledButton: true});
  };

  //Function for getting the amount of players who are ready to play from the database
  getReadyPlayerAmount = () => {
    let readyPlayerAmount = 0;
    let currentRoom = firebase.database().ref().child('room/'+this.props.navigation.getParam('room_id'));
    currentRoom.on('value', (snapshot) => {
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
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
            labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
            ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
            magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet
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