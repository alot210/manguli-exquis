import React from 'react';
import HeaderBar from "../components/HeaderBar";
import firebase from '../constants/FirebaseConfig';
import Colors from "../constants/Colors";
import { View, Alert } from 'react-native';
import { Container, Content, Form, Label, Input, Item, Button, Text } from 'native-base';

export default class JoinRoomScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            link: "",
            user_id: this.props.navigation.getParam('userID', 0),
        }
    }

  static navigationOptions = {
    drawerLabel: () => null
  };

    enterRoom(_that) {
        let _link = this.state.link;
        let _userID = this.state.user_id;
        let _roomID;
        let _creatorID;
        let data = [];
        let found = false;

        let allRooms = firebase.database().ref('room/');
        allRooms.once('value', function (snapshot) {
            snapshot.forEach(function (item) {
                data.push(item);
            });

            for (let i = 0; i < data.length; i++){
                _roomID = data[i].child("roomID").val();
                if(data[i].child("link").val() === _link){
                    firebase.database().ref('roomContent/' + _roomID+'|'+ _userID).set({
                        userID: _userID,
                        roomID: _roomID,
                        content: "",
                        timestamp: ""
                    });
                    _creatorID = data[i].child("creator").val();
                    found = true;
                    break;
                }
            }

            if(!found){
                alert("Es gibt keinen Raum mit diesem Link!");
            } else {
                _that.props.navigation.navigate("Dashboard", {
                  roomID: _roomID,
                  userID: _userID,
                  creatorID: _creatorID,
                });
            }
        });
    }

  render() {
    return (
      <Container>
        <HeaderBar {...this.props} title='Raum beitreten' />
        <Content>

          <Form style={{marginTop: 64}}>
            <Item floatingLabel>
                <Label>Link einfügen</Label>
                <Input value={this.state.link} onChangeText={(link) => this.setState({link})} />
            </Item>
          </Form>
          <Button
            style={{alignSelf: 'center'}}
            onPress={() => this.enterRoom(this)}>
            <Text>Raum beitreten</Text>
          </Button>
            <Button
                style={{alignSelf: 'center'}}
                onPress={() => this.props.navigation.navigate('LoginScreen')}>
                <Text>Zurück</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}