import React from 'react';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import { SafeAreaView } from 'react-native';

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
  <SafeAreaView style={{backgroundColor: Colors.primaryColor, flex: 1}}>
      <DrawerItems {...props} />
  </SafeAreaView>
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
  }
});