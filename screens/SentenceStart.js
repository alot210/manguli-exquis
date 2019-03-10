import React from 'react';
import { View } from 'react-native';
import { Container, Text, Button} from 'native-base';
import firebase from '../constants/FirebaseConfig';

import HeaderBar from '../components/HeaderBar';

export default class SentenceStart extends React.Component {
  _isMounted = false;

  static navigationOptions = {
    //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
    drawerLabel: () => null
  };

  constructor(props) {
    super(props);

    this.state = {
      allPlayerReady: false,
      readyPlayers: 0,
      disabledButton: false,
      readyPlayersAmount: 0,
    };

    this.currentRoom = firebase.database().ref().child('room/'+this.props.navigation.getParam('room_id'));
    this.currentRoomContentRef = firebase.database().ref('roomContent/');
  }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  onValueChanged = (snapshot) => {
    //Set State FOR EVERY PLAYER in the current room
    if(this._isMounted)
      this.setState({readyPlayersAmount: this.getReadyPlayerAmount()});
    //Navigate ALL PLAYERS to the next screen when ALL PLAYERS are ready
    if (this.getReadyPlayerAmount() === this.props.navigation.getParam('number_of_players')) {

      console.log('playerSequence: '+snapshot.child('playerSequence').val());

      if(this.props.navigation.getParam('gameMode') !== 0) {
        if(snapshot.child('playerSequence').val()[0] === this.props.navigation.getParam('user_id'))
          this.props.navigation.navigate('GameInput', {
            room_id: this.props.navigation.getParam('room_id'),
            user_id: this.props.navigation.getParam('user_id'),
            ready_player_amount: this.state.readyPlayersAmount,
            playerSequence: snapshot.child('playerSequence').val(),
            gameMode: this.props.navigation.getParam('gameMode'),
          });
        else
          this.props.navigation.navigate('GameWait', {
            room_id: this.props.navigation.getParam('room_id'),
            user_id: this.props.navigation.getParam('user_id'),
            ready_player_amount: this.state.readyPlayersAmount,
            playerSequence: snapshot.child('playerSequence').val(),
            gameMode: this.props.navigation.getParam('gameMode'),
          });
      }
      else
        this.props.navigation.navigate('GameInput', {
          room_id: this.props.navigation.getParam('room_id'),
          user_id: this.props.navigation.getParam('user_id'),
          ready_player_amount: this.state.readyPlayersAmount,
          playerSequence: snapshot.child('playerSequence').val(),
          gameMode: this.props.navigation.getParam('gameMode'),
        });
    }
  };

  //Create an on value change listener FOR EVERY PLAYER in the current room
  componentDidMount() {
    this._isMounted = true;

    let playerSequence = [];

    this.currentRoomContentRef.once('value', (snapshot) => {
      snapshot.forEach((item) => {
        if (item.child('roomID').val() === this.props.navigation.getParam('room_id'))
          playerSequence.push(item.child('userID').val());
      });

      if (this.props.navigation.getParam('number_of_players') === playerSequence.length) {
        this.shuffleArray(playerSequence);
        this.currentRoom.update({playerSequence: playerSequence});
        // console.log(playerSequence);
      }
    });

    this.currentRoom.on('value', this.onValueChanged);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.currentRoom.off('value', this.onValueChanged);
  }

  //Function for setting the amount of players who are ready to play into the database and disable button
  gameStart = () => {
    this.currentRoom.update({readyPlayersAmount: this.getReadyPlayerAmount() + 1});
    if(this._isMounted)
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
    const SentenceGame = () => (
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
    );

    const PoemGame = () => (
      <Container>
        <HeaderBar {...this.props} title='Gedicht'/>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 64}}>
          <Text style={{alignSelf: 'center', paddingBottom: 32}}>Gedicht</Text>
          <Text style={{alignSelf: 'center', paddingBottom: 32, paddingLeft: 16, paddingRight: 16}}>
            Gespielt wird mit einem festen Reimschema. Es wird zufällig ein Spieler ausgesucht der begint.
            Das letzte Wort seiner Gedichtszeile, wird dem nächsten Spieler angezeigt. Auf dieses Wort soll
            die nächste Gedichtszeile geschrieben werden, solange bis alle Spieler fertig sind. Nachdem alle Mitspieler
            ihre Gedichtszeile abgeschickt haben, wird das Gedicht zusammengesetzt und für alle Ausgegeben.
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
    );

    const TextGame = () => (
      <Container>
        <HeaderBar {...this.props} title='Text'/>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 64}}>
          <Text style={{alignSelf: 'center', paddingBottom: 32}}>Text</Text>
          <Text style={{alignSelf: 'center', paddingBottom: 32, paddingLeft: 16, paddingRight: 16}}>
            Gespielt wird in einer zufälligen Reihenfolge, in der ein Text geschrieben werden soll.
            Es wird zufällig ein Spieler ausgesucht der begint. Der letzte Satz des Textes vom Vorgänger,
            wird dem nächsten Spieler angezeigt. Auf diesen Satz soll der nächste Textabschnitt geschrieben werden,
            solange bis alle Spieler fertig sind. Nachdem alle Mitspieler ihren Textabschnitt abgeschickt haben,
            wird der Text zusammengesetzt und für alle Ausgegeben.
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
    );

    switch (this.props.navigation.getParam('gameMode')) {
      case 0:
        return SentenceGame();
      case 1:
        return PoemGame();
      case 2:
        return TextGame();
      default:
        return null;
    }
  }
}