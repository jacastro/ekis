import React from 'react';
import { ScrollView, Switch, StyleSheet, AsyncStorage } from 'react-native';
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Card, Avatar, Picker, TagsInput, TextArea} from 'react-native-ui-lib';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { login } from './../services/common';

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      userType: "student",
    }
  }

  onLogin = () => {
    login(this.state).then((app) => {
      console.log(app)
      this.props.navigation.navigate(app);
    })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title:  `Bienvenido a EKIS!`,
    };
  };

  render() {
    return (
      <View useSafeArea margin-20>   
        <Text text20>Iniciar Sesión</Text>
        <TextInput
          floatingPlaceholder
          onChangeText={username => this.setState({ username })}
          floatOnFocus
          value={this.state.username}
          placeholder='DNI'
        />

        <TextInput
          floatingPlaceholder
          onChangeText={password => this.setState({ password })}
          floatOnFocus
          value={this.state.password}
          placeholder='Contraseña'
        />

        <Button
          backgroundColor={Colors.green40}
          label="Iniciar Sesión"
          enableShadow
          onPress={this.onLogin}
          style={{marginBottom: 20}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttons: {
    borderRadius: 10,
    margin: 8,
    backgroundColor: '#F6F6F6',
    shadowOpacity: 0.75,
    shadowRadius: 10,
    shadowColor: '#999',
    borderRadius: 10,
    shadowOffset: { height: 10, width: 0 },
    padding: 15
  },
  icon: {
    margin: 'auto',
  }
});