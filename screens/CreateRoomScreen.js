import React from 'react';
import HeaderBar from "../components/HeaderBar";
import Colors from "../constants/Colors";
import { View, Alert, Clipboard } from 'react-native';
import { Container, Content, Form, Label, Input, Item, Button, Text } from 'native-base';
import firebase from '../constants/FirebaseConfig';

export default class CreateRoomScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          name: "",
          //user_id: 1
      }
  };

  static navigationOptions = {
    drawerLabel: () => null
  };

  createRoom(_that) {
    let _roomID;
    let _userID = this.state.user_id;
    let _name = this.state.name;
    let _link = "";
    let possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";

    for(let i = 0; i < 5; i++){
        _link = _link + possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }

    let allRooms = firebase.database().ref('room/');
      allRooms.once('value', function (snapshot) {
          snapshot.forEach(function (item) {
              _roomID = item.child("roomID").val();
          });

          //ID hochzählen für nächsten Raum
          _roomID = _roomID + 1;

          if(_name === ""){
              alert("Der Raumname darf nicht leer sein!");
          } else {
              firebase.database().ref('room/' + _roomID).set({
                  roomID: _roomID,
                  name: _name,
                  link: _link,
                  creator: _userID,
                  gameMode: '',
              });

              firebase.database().ref('roomContent/' + _roomID + '|' + _userID).set({
                  userID: _userID,
                  roomID: _roomID,
                  content: "",
                  timestamp: ""
              });

              Clipboard.setString(_link);

              Alert.alert(
                  "Ihr Raum wurde erstellt",
                  "Der Link zu Ihrem Raum lautet:\n" + _link + "\nDer Link wurde in die Zwischenablage kopiert!",
                  [
                      {text: "OK",
                          onPress: () => _that.props.navigation.navigate("Dashboard", {
                              creatorID: _userID,
                              userID: _userID,
                              roomID: _roomID
                          })
                      },
                  ],
                  {cancelable: false},
              );
          }
      });
  }

  render() {
    this.state.user_id = this.props.navigation.getParam('userID', 0);
    return (
      <Container>
          <HeaderBar {...this.props} title='Raum Erstellung' />
          <Content>
            <Form style={{marginTop: 64}}>
                <Item floatingLabel>
                    <Label>Raumname</Label>
                    <Input value={this.state.name} onChangeText={(name) => this.setState({name})} />
                </Item>
            </Form>
            <Button
                style={{alignSelf: 'center'}}
                onPress={() => this.createRoom(this)}>
                <Text>Raum erstellen</Text>
            </Button>
            <Button
              style={{alignSelf: 'center', marginTop: 10, width: 200}}
              onPress={() => this.props.navigation.navigate('Lobby')}>
              <Text>Zurück</Text>
            </Button>
          </Content>
      </Container>
    );
  }
}