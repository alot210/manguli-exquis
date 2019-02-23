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

      firebase.database().ref('roomContent/' + _roomID+'|'+_userID).update({
          userID: _userID,
          roomID: _roomID,
          content: _word,
          timestamp: _timestamp,
      });

      this.setState({playerHasToWait: true});



      this.currentRoomRef.once('value', (snapshot) => {
        this.currentRoomRef.update({playerSubmitedValue: snapshot.child('playerSubmitedValue').val() + 1});
      })

    this.currentRoomRef.on('value', (snapshot) => {
      if(snapshot.child('playerSubmitedValue').val() === 2)
        this.props.navigation.navigate('GameEnd', {playerSequence: 'playerSequnce'});
    });

    // this.currentRoomRef.once('value', (snapshot) => {
      //   this.currentRoomRef.update({playerSubmitValue: snapshot.child('playerSubmitValue').val() + 1});
      // });
      //
      // if(this.playerSubmitValue === 2) {
      //   this.props.navigation.navigate('GameEnd', {playerSequence: 'playerSequence'});
      // }
  }

  componentWillMount() {
    let playerSequence = [];

    this.roomMemberRef.once('value', (snapshot) => {
      snapshot.forEach((item) => {
        if(item.child('roomID').val() === this.props.navigation.getParam('room_id'))
          playerSequence.push(item.child('userID').val());
      });
    });

    // this.currentRoomRef.once('value', (snapshot) => {
    //   roomCreator = snapshot.child('creator').val();
    // });

    // if(roomCreator === this.props.navigation.getParam('user_id')) {
    //   this.shuffleArray(playerSequence);
    //   this.currentRoomRef.update({playerSequence: playerSequence});
    // }

    //console.log(this.props.navigation.getParam('user_id') + '  ' + playerSequence);

    for(let i = 0; i < 2; i++) {
      playerSequence.forEach((item, index) => {
        if(this.props.navigation.getParam('user_id') === item) {
          if(i === index)
            switch (i) {
              case 0:
                this.setState({wordtype: 'Subjekt'});
                break;
              case 1:
                this.setState({wordtype: 'Prädikat'});
                break;
              default:
                this.setState({wordtype: 'dummy'});
                break;
            }
        }
      });
    }


    // //for(let i = 0; i < 2; i++) {
    // for(let i = 0; i < 1; i++) {
    //   for(let j = 0; j < playerSequence.length; j++) {
    //     console.log('UserID: '+this.props.navigation.getParam('user_id')+' Wortart: ' + i + ' Position: ' + j + ' Spieler an Position: '+ playerSequence[j]);
    //     if(this.props.navigation.getParam('user_id') === playerSequence[j]) {
    //       console.log('J: ' + j + ' I: ' + i);
    //       if(j === i) {
    //         switch (i) {
    //           case 0:
    //             this.setState({wordtype: 'Subjekt'});
    //             break;
    //           case 1:
    //             this.setState({wordtype: 'Prädikat'});
    //             break;
    //           // case 2:
    //           //   this.setState({wordtype: 'Objekt'});
    //           //   break;
    //           default:
    //             this.setState({wordtype: 'dummy'});
    //             break;
    //         }
    //       }
    //     }
    //   }
    // }
  };

  render() {

    const PlayerInput = () => (
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
    );

    const PlayerWait = () => (
      <View style={{flex: 1, justifyContent: 'center', marginTop: 64}}>
        <Text style={{alignSelf: 'center', paddingBottom: 32}}>Satzbau</Text>
        <Text style={{alignSelf: 'center', paddingLeft: 16, paddingRight: 16}}>
          Warte bis die anderen Fertig sind...
        </Text>
      </View>
    );

    return (
      <Container>
        <HeaderBar {...this.props} title='Satzbau'/>
        {this.state.playerHasToWait ? PlayerWait() : PlayerInput()}
      </Container>
    )
  }
}