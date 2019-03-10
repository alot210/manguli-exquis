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
      };

      this.roomMemberRef = firebase.database().ref('roomContent/');
      this.currentRoomRef = firebase.database().ref().child('room/'+this.props.navigation.getParam('room_id'));
    }

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
          this.props.navigation.navigate('GameWait', {
            playerSequence: this.props.navigation.getParam('playerSequence'),
            room_id: _roomID,
            user_id: _userID,
            gameMode: this.props.navigation.getParam('gameMode'),
          });
        }
      }
  }

  sentenceGameLogic() {
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
                      this.setState({wordtype: 'ein Subjekt (Wer oder was?)'});
                    break;
                  case 1:
                    if(this._isMounted)
                      this.setState({wordtype: 'ein Prädikat (Verb des Satzes)'});
                    break;
                  case 2:
                    if(this._isMounted)
                      this.setState({wordtype: 'ein Objekt (Wen oder was?)'});
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
    });
  }

  poemGameLogic() {
      if(this._isMounted)
      this.setState({wordtype: 'eine Gedichtszeile eingeben'});

      this.currentRoomRef.once('value', (snapshot) => {
        let prevUser = snapshot.child('playerSequence').val()[snapshot.child('playerSubmitedValue').val() - 1];
        // console.log('prevUSER: '+prevUser);
        this.roomMemberRef.once('value', (innerSnapshot) => {
          innerSnapshot.forEach((item) => {
            if (item.child('roomID').val() === this.props.navigation.getParam('room_id')) {
              if (item.child('userID').val() === prevUser) {
                let lastWord = item.child('content').val().trim().split(" ").pop();
                if(this._isMounted)
                this.setState({wordtype: 'auf das Wort: '+lastWord+' eine Gedichtszeile reimen'});
              }
            }
          });
        });
      });
  };

    textGameLogic() {
      if(this._isMounted)
        this.setState({wordtype: 'einen Textabschnitt'});

      this.currentRoomRef.once('value', (snapshot) => {
        let prevUser = snapshot.child('playerSequence').val()[snapshot.child('playerSubmitedValue').val() - 1];
        // console.log('prevUSER: '+prevUser);
        this.roomMemberRef.once('value', (innerSnapshot) => {
          innerSnapshot.forEach((item) => {
            if (item.child('roomID').val() === this.props.navigation.getParam('room_id')) {
              if (item.child('userID').val() === prevUser) {
                let lastSentence = item.child('content').val().trim().split(".").pop();
                if(this._isMounted)
                  this.setState({wordtype: 'nach dem Satz: '+lastSentence+' einen Textabschnitt schreiben'});
              }
            }
          });
        });
      });
    }

  componentDidMount() {
    this._isMounted = true;

    // console.log('GameInput: '+this.props.navigation.getParam('gameMode'));

    switch (this.props.navigation.getParam('gameMode')) {
      case 0:
        this.sentenceGameLogic();
        break;
      case 1:
        this.poemGameLogic();
        break;
      case 2:
        this.textGameLogic();
        break;
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const SentenceGameView = () => (
      <Container>
        <HeaderBar {...this.props} title='Satzbau'/>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 64}}>
          <View>
            <Text style={{}}>Bitte {this.state.wordtype} eingeben.</Text>
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
    );

    const PoemGameView = () => (
      <Container>
        <HeaderBar {...this.props} title='Gedicht'/>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 64}}>
          <View>
            <Text style={{}}>Bitte {this.state.wordtype}.</Text>
            <Text style={{alignSelf: 'center', paddingBottom: 32}}>Gedicht</Text>
            <Form style={{alignSelf: 'center', width: 132}}>
              <Item floatingLabel>
                <Label>Gedichtzeile</Label>
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
    );

    const TextGameView = () => (
      <Container>
        <HeaderBar {...this.props} title='Text'/>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 64}}>
          <View>
            <Text style={{}}>Bitte {this.state.wordtype}.</Text>
            <Text style={{alignSelf: 'center', paddingBottom: 32}}>Text</Text>
            <Form style={{alignSelf: 'center', width: 132}}>
              <Item floatingLabel>
                <Label>Textabschnitt</Label>
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
    );

    switch (this.props.navigation.getParam('gameMode')) {
      case 0:
        return SentenceGameView();
      case 1:
        return PoemGameView();
      case 2:
        return TextGameView();
      default:
        return null;
    }
  }
}