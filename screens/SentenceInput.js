import React from 'react';
import { View } from 'react-native';
import { Container, Text, Button, Form, Item, Label, Input } from 'native-base';

import HeaderBar from '../components/HeaderBar';

export default class SentenceInput extends React.Component {
  /*static navigationOptions = {
    //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
    drawerLabel: () => null
  };*/
  render() {
    return (
      <Container>
        <HeaderBar {...this.props} title='Satzbau'/>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 64}}>
          <Text style={{alignSelf: 'center', paddingBottom: 32}}>Satzbau</Text>
          <Form style={{alignSelf: 'center', width: 132}}>
            <Item floatingLabel>
              <Label>Wort</Label>
              <Input/>
            </Item>
          </Form>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Button
            style={{alignSelf: 'center'}}
            onPress={ () => this.props.navigation.navigate('SentenceEnd')}>
            <Text>Abschicken</Text>
          </Button>
        </View>
      </Container>
    )
  }
}