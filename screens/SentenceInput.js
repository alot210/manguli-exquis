import React from 'react';
import { View } from 'react-native';
import { Container, Text, Button, Form, Item, Label, Input } from 'native-base';
import firebase from '../constants/FirebaseConfig';
import HeaderBar from '../components/HeaderBar';


export default class SentenceInput extends React.Component {
  _isMounted = false;

  static navigationOptions = {
    //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
    drawerLabel: () => null
  };

    constructor(props){
      super(props);
      this.state = {
        word: "",
        wordtype: 'test',
        playerHasToWait: false,
        playerSequence: [],
      };

      this.roomMemberRef = firebase.database().ref('roomContent/');
      this.currentRoomRef = firebase.database().ref().child('room/'+this.props.navigation.getParam('room_id'));
    }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  addSentence() {
      let _userID = this.props.navigation.getParam('user_id');
      let _roomID = this.props.navigation.getParam('room_id');
      let _word = this.state.word;
      let date = new Date();
      let _timestamp =  date.getFullYear() + "-" +
                        date.getMonth()+1 + "-" +
                        date.getDate() + "|" +
                        date.getHours() + ":" +
                        date.getMinutes() + ":" +
                        date.getSeconds();

      if(_word === ""){
          alert("Geben Sie ein Wort ein");
      } else {
          firebase.database().ref('roomContent/' + _roomID+'|'+_userID).update({
              userID: _userID,
              roomID: _roomID,
              content: _word,
              timestamp: _timestamp,
          });

        if(this._isMounted) {
          this.setState({playerHasToWait: true});
          this.props.navigation.navigate('GameWait', {playerSequence: this.state.playerSequence, room_id: _roomID, user_id: _userID});
        }
      }
  }


  componentDidMount() {
    this._isMounted = true;

    let playerSequence = [];
    this.roomMemberRef.once('value', (snapshot) => {
      snapshot.forEach((item) => {
        if(item.child('roomID').val() === this.props.navigation.getParam('room_id'))
          playerSequence.push(item.child('userID').val());
      });

      if(this.props.navigation.getParam('ready_player_amount') === playerSequence.length) {
        this.shuffleArray(playerSequence);
        this.currentRoomRef.update({playerSequence: playerSequence});
      }

      this.currentRoomRef.once('value', (snapshot) => {
        let newPlayerSequence = snapshot.child('playerSequence').val();
        if(newPlayerSequence !== null) {
          for(let i = 0; i < newPlayerSequence.length; i++) {
            newPlayerSequence.forEach((item, index) => {
              if(this.props.navigation.getParam('user_id') === item) {
                if(i === index) {
                  switch (i % 3) {
                    case 0:
                      if(this._isMounted)
                      this.setState({wordtype: 'Subjekt (Wer oder was?)'});
                      break;
                    case 1:
                      if(this._isMounted)
                      this.setState({wordtype: 'Prädikat (Verb des Satzes)'});
                      break;
                    case 2:
                      if(this._isMounted)
                      this.setState({wordtype: 'Objekt (Wen oder was?)'});
                      break;
                    default:
                      if(this._isMounted)
                      this.setState({wordtype: 'dummy'});
                      break;
                  }
                }
              }
            });
          }
        }
        if(this._isMounted)
          this.setState({playerSequence: playerSequence});
      });
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Container>
        <HeaderBar {...this.props} title='Satzbau'/>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 64}}>
          <View>
            <Text style={{}}>Bitte ein {this.state.wordtype} eingeben.</Text>
            <Text style={{alignSelf: 'center', paddingBottom: 32}}>Satzbau</Text>
            <Form style={{alignSelf: 'center', width: 132}}>
              <Item floatingLabel>
                <Label>Wort</Label>
                <Input value={this.state.word} onChangeText={(word) => this.setState({word})} />
              </Item>
            </Form>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Button
              style={{alignSelf: 'center'}}
              onPress={() => this.addSentence()}>
              <Text>Abschicken</Text>
            </Button>
          </View>
        </View>
      </Container>
    )
  }
}