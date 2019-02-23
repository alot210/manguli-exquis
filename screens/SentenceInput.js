import React from 'react';
import { View } from 'react-native';
import { Container, Text, Button, Form, Item, Label, Input } from 'native-base';
import firebase from '../constants/FirebaseConfig';
import HeaderBar from '../components/HeaderBar';


export default class SentenceInput extends React.Component {
  /*static navigationOptions = {
    //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
    drawerLabel: () => null
  };*/
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

          this.setState({playerHasToWait: true});
          this.props.navigation.navigate('GameWait', {playerSequence: this.state.playerSequence, room_id: _roomID, user_id: _userID});
      }
  }

  componentWillMount() {
    let playerSequence = [];
    this.roomMemberRef.once('value', (snapshot) => {
      snapshot.forEach((item) => {
        if(item.child('roomID').val() === this.props.navigation.getParam('room_id'))
          playerSequence.push(item.child('userID').val());
      });

      for(let i = 0; i < playerSequence.length; i++) {
        playerSequence.forEach((item, index) => {
          if(this.props.navigation.getParam('user_id') === item) {
            if(i === index) {
              console.log('USERID: ' + this.props.navigation.getParam('user_id') + ' ITEM: ' + item + ' I: ' + i + ' INDEX: ' + index + ' MODULO: ' + (i % 3));
              switch (i % 3) {
                case 0:
                  this.setState({wordtype: 'Subjekt'});
                  console.log('Subjekt');
                  break;
                case 1:
                  this.setState({wordtype: 'Prädikat'});
                  console.log('Prädikat');
                  break;
                case 2:
                  this.setState({wordtype: 'Objekt'});
                  console.log('Objekt');
                  break;
                default:
                  this.setState({wordtype: 'dummy'});
                  break;
              }
            }
          }
        });
        this.setState({playerSequence: playerSequence});
      }
    });

    // this.currentRoomRef.once('value', (snapshot) => {
    //   roomCreator = snapshot.child('creator').val();
    // });

    // if(roomCreator === this.props.navigation.getParam('user_id')) {
    //   this.shuffleArray(playerSequence);
    //   this.currentRoomRef.update({playerSequence: playerSequence});
    // }

    //console.log(this.props.navigation.getParam('user_id') + '  ' + playerSequence);
  };

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