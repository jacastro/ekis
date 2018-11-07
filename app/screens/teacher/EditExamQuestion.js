import React, {Component} from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {SwipeableFlatList, StyleSheet, Alert, Image, ScrollView, Switch} from 'react-native';
import { Cell, TableView, Section, Separator } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import {ListItem,  Text,  BorderRadiuses, Colors, LoaderScreen, View, TextInput, Modal, WheelPicker} from 'react-native-ui-lib';//eslint-disable-line
import * as Animatable from 'react-native-animatable';

export class EditExamQuestionScreen extends Component {
  constructor (props) {
    super(props);
    const question = props.navigation.getParam('question', {
      text: '',
      answers: [],
    });
    
    this.state = {
      ...question,
      changed: false,
      loading: false
    }
  }

  onChangeText = (text) => {
    this.setState({
      changed: true,
      text
    });
  }

  onSave = () => {
    // make call
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      this.props.navigation.getParam('onSave', {})(this.state);
      this.props.navigation.goBack(); 
    }, 1000);
  }
  
  render() {
    return (
      <View bg-white flex>
        {this.state.loading && <LoaderScreen
          overlay
          backgroundColor={Colors.rgba(Colors.dark80, 0.85)}
        />}
        <Modal.TopBar
          title="Editar Pregunta"
          onCancel={() => this.props.navigation.goBack()}
          onDone={this.onSave}
          doneLabel='Guardar'
          doneButtonProps={{
            disabled: !this.state.changed,
          }}
        />
        <View padding-30 flex>
          <TextInput
            text70
            containerStyle={{marginBottom: 10}}
            floatingPlaceholder
            placeholder="Pregunta"
            onChangeText={this.onChangeText}
            //error={this.state.error}
            //useTopErrors={this.state.topError}
            multiline
            value={this.state.text}
            floatOnFocus
          />
          <TextInput
            text70
            containerStyle={{marginBottom: 10}}
            floatingPlaceholder
            placeholder="Respuesta correcta"
            onChangeText={this.onChangeText}
            //error={this.state.error}
            //useTopErrors={this.state.topError}
            multiline
            value={this.state.text}
            floatOnFocus
          />
        </View>
      </View>
    );
  }
}