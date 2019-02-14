import React from 'react';
import HeaderBar from "../components/HeaderBar";
import Colors from "../constants/Colors";
import { View, Alert } from 'react-native';
import { Container, Content, Form, Label, Input, Item, Button, Text } from 'native-base';
import firebase from '../constants/FirebaseConfig';

export default class CreateRoomScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          name: "Raumname",
          password: "",
          //user_id: 1
      }
  };

  static navigationOptions = {
    drawerLabel: () => null
  };

  createRoom(_that) {
    let _roomID;
    let _userID = this.state.user_id;
    let _passwort = this.state.password;
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

          firebase.database().ref('room/' + _roomID).set({
              roomID: _roomID,
              passwort: _passwort,
              name: _name,
              link: _link,
              creator: _userID
          });

          firebase.database().ref('roomContent/' + _roomID+'|'+ _userID).set({
              userID: _userID,
              roomID: _roomID,
              content: "",
              timestamp: ""
          });

          Alert.alert(
              "Ihr Raum wurde erstellt",
              "Der Link zu Ihrem Raum lautet: " + _link,
              [
                  {text: "OK", onPress: () => _that.props.navigation.navigate("Dashboard", {creatorID: _userID})},
              ],
              {cancelable: false},
          );
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
                      <Label>Username</Label>
                      <Input value={this.state.name} onChangeText={(name) => this.setState({name})} />
                  </Item>
                  <Item floatingLabel last>
                      <Label>Password</Label>
                      <Input value={this.state.password} onChangeText={(password) => this.setState({password})} />
                  </Item>
              </Form>
              <Button
                  style={{alignSelf: 'center'}}
                  onPress={() => this.createRoom(this)}>
                  <Text>Raum erstellen</Text>
              </Button>
          </Content>
      </Container>
    );
  }
}