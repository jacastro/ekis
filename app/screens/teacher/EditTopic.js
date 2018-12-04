import React, {Component} from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {SwipeableFlatList, StyleSheet, Alert, Image, ScrollView, Switch} from 'react-native';
import { Cell, TableView, Section, Separator } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import {ListItem,  Text,  BorderRadiuses, Colors, LoaderScreen, View, TextInput, Modal, WheelPicker, Button} from 'react-native-ui-lib';//eslint-disable-line
import * as Animatable from 'react-native-animatable';
import { updateTopic, deleteTopic } from '../../services/teacher';

WheelPicker.Item

export class EditTopicScreen extends Component {
  constructor (props) {
    super(props);
    const topic = props.navigation.getParam('topic', {
      title: '',
      description: ''
    });
    this.state = {
      ...topic,
      changed: false,
      loading: false,
      lesson: props.navigation.getParam('lesson',{}),
    }
  }

  onChangeTitle = (title) => {
    this.setState({
      changed: true,
      title
    });
  }

  onChangeText = (description) => {
    this.setState({
      changed: true,
      description
    });
  }

  onSave = () => {
    this.setState({ loading: true });

    const { title, description, lesson, id } = this.state;

    updateTopic(lesson.id, id, title, description).then((response) => {
      console.log(response)
      this.setState({ loading: false });
      this.props.navigation.getParam('onSave', {})(response);
      this.props.navigation.goBack();
    })
  }

  onDelete = () => {
    this.setState({ loading: true });
    deleteTopic(this.state.id).then(() => {
      this.setState({ loading: false });
      this.props.navigation.getParam('onDelete', {})(this.state.id);
      this.props.navigation.goBack();
    });
  }
  
  render() {
    return (
      <View bg-white flex>
        {this.state.loading && <LoaderScreen
          overlay
          backgroundColor={Colors.rgba(Colors.dark80, 0.85)}
        />}
        <Modal.TopBar
          title={this.state.id ? "Editar Tema" : "Crear nuevo tema"}
          onCancel={() => this.props.navigation.goBack()}
          onDone={this.onSave}
          doneLabel={this.state.id ? "Guardar" : "Listo!"}
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
            value={this.state.description}
            floatOnFocus
          />
          { this.state.id && <Button
            label="Eliminar tema"
            enableShadow
            backgroundColor={Colors.red20}
            marginT-50
            onPress={this.onDelete}
          />}
        </View>
      </View>
    );
  }
}