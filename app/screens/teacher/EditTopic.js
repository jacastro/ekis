import React, {Component} from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {SwipeableFlatList, StyleSheet, Alert, Image, ScrollView, Switch} from 'react-native';
import { Cell, TableView, Section, Separator } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import {ListItem,  Text,  BorderRadiuses, Colors, LoaderScreen, View, TextInput, Modal, WheelPicker} from 'react-native-ui-lib';//eslint-disable-line
import * as Animatable from 'react-native-animatable';

WheelPicker.Item

export class EditTopicScreen extends Component {
  constructor (props) {
    super(props);
    const topic = props.navigation.getParam('topic', {
      title: '',
      text: ''
    });
    this.state = {
      ...topic,
      changed: false,
      loading: false
    }
  }

  onChangeTitle = (title) => {
    this.setState({
      changed: true,
      title
    });
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
    }, 2000);
  }
  
  render() {
    const topic = this.state.topic;
    const program = [
      {
        classNumber: 1,
        title: 'Inicio de la Primera Guerra Mundial',
      },
      {
        classNumber: 2,
        title: 'Fases de la Primera Guerra Mundial',
      },
      {
        classNumber: 3,
        title: 'Fin de la Primera Guerra Mundial',
      },
      {
        classNumber: 4,
        title: 'Consecuencias de la Primera Guerra Mundial',
      }
    ];
    return (
      <View bg-white flex>
        {this.state.loading && <LoaderScreen
          overlay
          backgroundColor={Colors.rgba(Colors.dark80, 0.85)}
        />}
        <Modal.TopBar
          title="Editar Tema"
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
            placeholder="Titulo"
            onChangeText={this.onChangeTitle}
            //error={this.state.error}
            //useTopErrors={this.state.topError}
            value={this.state.title}
            floatOnFocus
          />
          <TextInput
            text70
            containerStyle={{marginBottom: 10}}
            floatingPlaceholder
            placeholder="Cuerpo del tema"
            onChangeText={this.onChangeText}
            //error={this.state.error}
            //useTopErrors={this.state.topError}
            multiline
            value={this.state.text}
            floatOnFocus
          />
          <WheelPicker
            selectedValue={1}
            onValueChange={() => alert("select")}
            //onCancel={() => alert("cancel")}
          >
            { program.map((row) => <WheelPicker.Item value={row.classNumber} key={row.classNumber} label={row.title}/>)}
          </WheelPicker>
        </View>
      </View>
    );
  }
}