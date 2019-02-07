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
            link: "Link hier einfügen",
            user_id: 1}
    }

  /*static navigationOptions = {
    drawerLabel: () => null
  };*/

    enterRoom() {
        let _link = this.state.link;
        let data = [];
        let found = false;
        let allRooms = firebase.database().ref('room/');
        allRooms.once('value', function (snapshot) {
            snapshot.forEach(function (item) {
                data.push(item.child("link").val());
            });

            for (let i = 0; i < data.length; i++){
                if(data[i] === _link){
                    console.log("Erfolgreich dem Raum beigetreten!");
                    found = true;
                    break;
                }
            }

            if(!found){
                console.log("Es gibt keinen Raum mit diesem Link!");
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
            onPress={() => this.enterRoom()}>
            <Text>Raum beitreten</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}