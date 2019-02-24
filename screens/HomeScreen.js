import React from 'react';
import {StatusBar, ImageBackground, SafeAreaView} from 'react-native';
import Colors from '../constants/Colors';
import {Header, Left, Right, Icon, Body, Title, Container, Content, Button, Text} from 'native-base';
import HeaderBar from "../components/HeaderBar";

export default class HomeScreen extends React.Component {
    render() {
        return (
            <Container>
                <HeaderBar {...this.props} title='Manguli Exquis'/>
                <ImageBackground style={{flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
                       source={require('../assets/images/pattern.png')}>
                    <Text style={{backgroundColor: '#ffffff', marginTop: 70, marginLeft: 10, marginRight: 10, fontSize: 24, textAlign: 'center'}}>
                        Logge dich ein um ein Minispiel starten zu können.</Text>
                    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
                        <Button primary style={{
                            backgroundColor: Colors.secondaryColor,
                            alignSelf: 'center',
                            marginBottom: 10,
                            width: 100
                        }} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Login</Text>
                        </Button>
                        <Button primary style={{
                            backgroundColor: Colors.secondaryColor,
                            alignSelf: 'center',
                            marginBottom: 10,
                            width: 100
                        }} onPress={() => this.props.navigation.navigate('Tutorial')}>
                            <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Tutorial</Text>
                        </Button>
                        <Button primary style={{
                            backgroundColor: Colors.secondaryColor,
                            alignSelf: 'center',
                            marginBottom: 10,
                            width: 100
                        }} onPress={() => this.props.navigation.navigate('Credits')}>
                            <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Credits</Text>
                        </Button>
                    </SafeAreaView>
                </ImageBackground>
            </Container>
        );
    }
}
