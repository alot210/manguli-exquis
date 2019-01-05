import React from 'react';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import { SafeAreaView, View } from 'react-native';
import { Title } from 'native-base';

import HomeScreen from '../screens/HomeScreen';
import TutorialScreen from '../screens/TutorialScreen';
import CreditScreen from '../screens/CreditScreen';
import Colors from "../constants/Colors";

export default class MainDrawerNavigator extends React.Component {
  render() {
    return(
      <AppDrawerNavigator />
    );
  }
}

const CostumDrawerComponent = (props) => (
  <View>
    <View style={{backgroundColor: Colors.primaryColor, height: 64, justifyContent: 'center', alignItems: 'center'}}>
      <Title style={{color: Colors.primaryTextColor, fontSize: 24, marginTop: 20}}>Menu</Title>
    </View>
    <DrawerItems {...props}/>
  </View>
);

const AppDrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
  Tutorial: TutorialScreen,
  Credits: CreditScreen,
}, {
  contentComponent: CostumDrawerComponent,
  contentOptions: {
    activeTintColor: Colors.secondaryTextColor,
    activeBackgroundColor: Colors.secondaryColor,
    inactiveTintColor: Colors.primaryTextColor,
    itemsContainerStyle: {
      paddingVertical: 0,
    }
  }
});