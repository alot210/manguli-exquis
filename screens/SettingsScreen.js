import React from 'react';
import { View } from 'react-native';
import { Container, Text, Button} from 'native-base';

import HeaderBar from '../components/HeaderBar';

export default class SettingsScreen extends React.Component {
  // static navigationOptions = {
  //   //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
  //   drawerLabel: () => null
  // };

  render() {
    return (
      <Container>
        <HeaderBar {...this.props} title='Settings'/>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Button
            style={{alignSelf: 'center'}}
            onPress={ () => this.props.navigation.navigate('Home')}>
            <Text>Log Out</Text>
          </Button>
        </View>
      </Container>
    )
  }
}