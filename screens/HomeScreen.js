import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Colors from '../constants/Colors';
import {Header, Left, Right, Icon, Body, Title, Container, Content, Button, Text} from 'native-base';
import HeaderBar from "../components/HeaderBar";

export default class HomeScreen extends React.Component {
    render() {
        return (
            <Container>
                <HeaderBar {...this.props} title='Manguli Exquis'/>

                <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
                    <Button primary style={{
                        backgroundColor: Colors.secondaryColor,
                        alignSelf: 'center',
                        marginBottom: 10,
                        width: 100
                    }} onPress={ () => this.props.navigation.navigate('Login') }>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Login</Text>
                    </Button>
                    <Button primary style={{
                        backgroundColor: Colors.secondaryColor,
                        alignSelf: 'center',
                        marginBottom: 10,
                        width: 100
                    }} onPress={  () => this.props.navigation.navigate('Tutorial')}>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Tutorial</Text>
                    </Button>
                    <Button primary style={{
                        backgroundColor: Colors.secondaryColor,
                        alignSelf: 'center',
                        marginBottom: 10,
                        width: 100
                    }} onPress={ () => this.props.navigation.navigate('Credits')}>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Credits</Text>
                    </Button>
                </SafeAreaView>

            </Container>
        );
    }
}
