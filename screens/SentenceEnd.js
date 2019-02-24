import React from 'react';
import { View } from 'react-native';
import { Container, Text, Button} from 'native-base';
import firebase from '../constants/FirebaseConfig';

import HeaderBar from '../components/HeaderBar';

export default class SentenceEnd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sentence: ""
        };

        this.roomContentRef = firebase.database().ref('roomContent');
        this.currentRoomRef = firebase.database().ref().child('room/'+this.props.navigation.getParam('room_id'));
    }
  /*static navigationOptions = {
    //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
    drawerLabel: () => null
  };*/

    componentWillMount() {
        let _sentence = "";
        let playerSequence = [];
        this.currentRoomRef.once('value', (snapshot) => {
          playerSequence = snapshot.child('playerSequence').val();

          this.roomContentRef.once('value', (snapshot) => {
            playerSequence.forEach((user) => {
              snapshot.forEach((item) => {
                if(item.child('roomID').val() === this.props.navigation.getParam('room_id')) {
                  if(item.child('userID').val() === user) {
                    console.log('HIT!!! '+item.child('content').val());
                    _sentence += item.child('content').val() + " ";
                  }
                }
              });
              this.setState({sentence: _sentence});
            });
          });
        });
    }

    newGame(_that, _logout) {
        firebase.database().ref().child('room/' + _that.props.navigation.getParam('room_id')).update({gameMode: ""});
        firebase.database().ref().child('room/' + _that.props.navigation.getParam('room_id')).update({readyPlayersAmount: 0});
        firebase.database().ref().child('roomContent/' + _that.props.navigation.getParam('room_id')+ "|" + _that.props.navigation.getParam('user_id')).update({content: ""});
        
        if(_logout){
            _that.props.navigation.navigate('Settings', {user_id: _that.props.navigation.getParam('user_id')})
        } else {
            _that.props.navigation.navigate('Dashboard', {user_id: _that.props.navigation.getParam('user_id'), room_id: _that.props.navigation.getParam('room_id')})
        }
    }

  render() {
    return (
      <Container>
        <HeaderBar {...this.props} title='Satzbau'/>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 64}}>
          <Text style={{alignSelf: 'center', paddingBottom: 32}}>Satzbau</Text>
          <Text style={{alignSelf: 'center', paddingLeft: 16, paddingRight: 16, paddingBottom: 16}}>
            Der Satz lautet:
          </Text>
          <Text style={{alignSelf: 'center'}}>
              {this.state.sentence}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Button
            style={{alignSelf: 'center', marginBottom: 20, width: 200}}
            onPress={ () => this.newGame(this, false)}>
            <Text>Neues Spiel</Text>
          </Button>
          <Button
            style={{alignSelf: 'center', width: 200}}
            onPress={ () => this.newGame(this, true)}>
            <Text>Logout</Text>
          </Button>
        </View>
      </Container>
    )
  }
}