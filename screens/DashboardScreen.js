import React from 'react';
import { View } from 'react-native';
import { Container, Text, Button} from 'native-base';

import HeaderBar from '../components/HeaderBar';

export default class DashboardScreen extends React.Component {
  /*static navigationOptions = {
    //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
    drawerLabel: () => null
  };*/
  render() {
    return (
      <Container>
        <HeaderBar {...this.props} title='Dashboard'/>
      </Container>
    )
  }
}