import React from 'react';
import { View } from 'react-native';
import { Container, Text, Button} from 'native-base';

import HeaderBar from '../components/HeaderBar';

export default class SentenceStart extends React.Component {
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
          <Text style={{alignSelf: 'center', paddingLeft: 16, paddingRight: 16}}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
            labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
            ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
            magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Button
            style={{alignSelf: 'center'}}
            onPress={ () => this.props.navigation.navigate('SentenceInput')}>
            <Text>Starten Jetzt</Text>
          </Button>
        </View>
      </Container>
    )
  }
}