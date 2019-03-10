import React from 'react';
import { View } from 'react-native';
import { Container, Text, Button} from 'native-base';
import firebase from '../constants/FirebaseConfig';

import HeaderBar from '../components/HeaderBar';

export default class SentenceWait extends React.Component {
  _isMounted = false;

  static navigationOptions = {
    //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
    drawerLabel: () => null
  };

  constructor(props) {
    super(props);
    this.state = {
      playerSubmitedValue: 0,
    };

    this.roomMemberRef = firebase.database().ref('roomContent');
    this.currentRoomRef = firebase.database().ref().child('room/'+this.props.navigation.getParam('room_id'));
  }

  getPlayerSubmitedValue = () => {
    let playerSubmitedValue = 0;
    this.currentRoomRef.on('value', (snapshot) => {
      if(snapshot.hasChild('playerSubmitedValue'))
        playerSubmitedValue = snapshot.child('playerSubmitedValue').val();
    });
    return playerSubmitedValue;
  };

  componentWillMount() {
    this._isMounted = true;

    let playerSequence = [];

    this.roomMemberRef.on('value', (snapshot) => {
      snapshot.forEach((item) => {
        if (item.child('roomID').val() === this.props.navigation.getParam('room_id')) {
          if(item.child('content').val() !== "" && this._isMounted) {
            this.currentRoomRef.update({playerSubmitedValue: this.getPlayerSubmitedValue() + 1});
            if(this._isMounted)
            this.setState({playerSubmitedValue: this.getPlayerSubmitedValue()});

            // this.currentRoomRef.once('value', (snapshot) => {
            //   playerSequence = snapshot.child('playerSequence').val();
            // });
            playerSequence = this.props.navigation.getParam('playerSequence');

            // console.log('GameWait: '+this.props.navigation.getParam('gameMode')+' Suquence: '+playerSequence+
            //   ' USERID: '+this.props.navigation.getParam('user_id')+' SubmitedValue: '+this.state.playerSubmitedValue+
            // ' NextUser: '+playerSequence[this.state.playerSubmitedValue]);


            if(playerSequence[this.getPlayerSubmitedValue()] === this.props.navigation.getParam('user_id')) {
              this.props.navigation.navigate('GameInput', {
                room_id: this.props.navigation.getParam('room_id'),
                user_id: this.props.navigation.getParam('user_id'),
                number_of_players: this.props.navigation.getParam('number_of_players'),
                gameMode: this.props.navigation.getParam('gameMode'),
                playerSequence: this.props.navigation.getParam('playerSequence'),
              });
            }
          }
        }

        this.currentRoomRef.on('value', (snapshot) => {
          if(snapshot.child('playerSequence').val().length === snapshot.child('playerSubmitedValue').val())
            this.props.navigation.navigate('GameEnd', {
              room_id: this.props.navigation.getParam('room_id'),
              user_id: this.props.navigation.getParam('user_id'),
              gameMode: this.props.navigation.getParam('gameMode'),
            });
        });

        // if(this.props.navigation.getParam('playerSequence').length === this.state.playerSubmitedValue){
        //     this.props.navigation.navigate('GameEnd', {room_id: this.props.navigation.getParam('room_id'), user_id: this.props.navigation.getParam('user_id')});
        // }
      });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.roomMemberRef.off();
    this.currentRoomRef.off();
  }

  render() {
    const SentenceGameWait = () => (
      <Container>
        <HeaderBar {...this.props} title='Satzbau'/>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 64}}>
          <Text style={{alignSelf: 'center', paddingBottom: 32}}>Satzbau</Text>
          <Text style={{alignSelf: 'center', paddingLeft: 16, paddingRight: 16}}>
            Warte bis die anderen Fertig sind...
          </Text>
        </View>
      </Container>
    );

    const PoemGameWait = () => (
      <Container>
        <HeaderBar {...this.props} title='Gedicht'/>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 64}}>
          <Text style={{alignSelf: 'center', paddingBottom: 32}}>Gedicht</Text>
          <Text style={{alignSelf: 'center', paddingLeft: 16, paddingRight: 16}}>
            Warte bis die anderen Fertig sind...
          </Text>
        </View>
      </Container>
    );

    switch (this.props.navigation.getParam('gameMode')) {
      case 0:
        return SentenceGameWait();
      case 1:
        return PoemGameWait();
      default:
        return null;
    }
  }
}