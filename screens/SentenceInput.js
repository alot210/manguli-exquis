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
        this.state = {  word: "Wort"}
    }

  addSentence() {
      let _userID = 1;
      let _roomID = 1;
      let _word = this.state.word;
      let date = new Date();
      let _timestamp =  date.getFullYear() + "-" +
                        date.getMonth()+1 + "-" +
                        date.getDate() + "|" +
                        date.getHours() + ":" +
                        date.getMinutes() + ":" +
                        date.getSeconds();

      firebase.database().ref('roomContent/' + _roomID).set({
          userID: _userID,
          roomID: _roomID,
          content: _word,
          timestamp: _timestamp
      });

      this.props.navigation.navigate('SentenceWait');
  }

  render() {
    return (
      <Container>
        <HeaderBar {...this.props} title='Satzbau'/>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 64}}>
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
      </Container>
    )
  }
}