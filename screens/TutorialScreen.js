import React from 'react';
import {StyleSheet, Image, ScrollView} from 'react-native';
import Colors from "../constants/Colors";
import {StatusBar} from 'react-native';
import {Header, Left, Right, Icon, Body, Title, Container, Text} from 'native-base';
import HeaderBar from "../components/HeaderBar";

export default class TutorialScreen extends React.Component {

    render() {
        return (
            <Container>
                <HeaderBar {...this.props} title='Tutorial'/>
                <ScrollView style={{flex: 1}}>
                    <Text style={{
                        alignSelf: 'center',
                        paddingBottom: 32,
                        paddingTop: 20,
                        color: Colors.primaryTextColor,
                        fontSize: 24
                    }}>1. Wähle einen Raum</Text>
                    <Text style={{alignSelf: 'center', paddingBottom: 20}}>Wähle zunächst einen existierenden Raum oder
                        erstelle deinen eigenen Raum.</Text>
                    <Image source={require('../assets/images/multiple-users-silhouette.png')}
                           style={{width: 80, height: 80, alignSelf: 'center'}}></Image>
                    <Text style={{
                        alignSelf: 'center',
                        paddingBottom: 32,
                        paddingTop: 50,
                        color: Colors.primaryTextColor,
                        fontSize: 24
                    }}>2. Entscheide dich für ein Spiel</Text>
                    <Text style={{alignSelf: 'center', paddingBottom: 20}}>Du hast die Möglichkeit zwischen diversen
                        Minispielen zu wählen.</Text>

                    <Image source={require('../assets/images/scrabble.png')}
                           style={{width: 80, height: 80, alignSelf: 'center', marginBottom: 20}}></Image>
                    <Text style={{alignSelf: 'center', paddingBottom: 40}}>Bilde verrückte Sätze!</Text>
                    <Image source={require('../assets/images/book.png')}
                           style={{width: 80, height: 80, alignSelf: 'center', marginBottom: 20}}></Image>
                    <Text style={{alignSelf: 'center', paddingBottom: 40}}>Erstelle deine eigene, verrückte
                        Geschichte!</Text>
                    <Image source={require('../assets/images/poem.png')}
                           style={{width: 80, height: 80, alignSelf: 'center', marginBottom: 20}}></Image>
                    <Text style={{alignSelf: 'center'}}>Reime drauf los!</Text>
                    <Text style={{
                        alignSelf: 'center',
                        paddingBottom: 32,
                        paddingTop: 50,
                        color: Colors.primaryTextColor,
                        fontSize: 24
                    }}>3. Beginne das Spiel</Text>
                    <Text style={{alignSelf: 'center', paddingBottom: 20}}>Mit dem Start-Button beginnst du das Spiel.
                        Um mehr Informationen über das Spiel zu erhalten benutze den Informations-Button.</Text>
                    <Image source={require('../assets/images/info.png')}
                           style={{width: 50, height: 50, alignSelf: 'center', marginBottom: 50}}></Image>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
