import React, {Component} from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {SwipeableFlatList, StyleSheet, Alert, Image, ScrollView, Switch} from 'react-native';
import { Cell, TableView, Section, Separator } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import {ListItem,  Text,  BorderRadiuses, Colors, LoaderScreen, View, TextInput, Modal, Button} from 'react-native-ui-lib';//eslint-disable-line
import * as Animatable from 'react-native-animatable';
import { updateExamQuestion, deleteExamQuestion } from '../../services/teacher';

export class EditExamQuestionScreen extends Component {
  constructor (props) {
    super(props);
    const question = props.navigation.getParam('question', {
      question: '',
      options: ["","","",""],
    });
    
    this.state = {
      ...question,
      changed: false,
      loading: false,
      examId: props.navigation.getParam('examId',""),
      shouldDelete: props.navigation.getParam('shouldDelete', false),
      shouldEdit: props.navigation.getParam('shouldEdit', true),
    }
  }

  onChangeOption = (text, number) => {
    this.state.options[number] = text;
    this.setState({
      changed: true,
      options: this.state.options,
    });
  }

  onSave = () => {
    const { examId, id, question, options } = this.state;
    this.setState({ loading: true });
    updateExamQuestion(examId, id, question, options).then((response) => {
      this.setState({ loading: false });
      this.props.navigation.getParam('onSave', {})(response);
      this.props.navigation.goBack();
    });
  }

  onDelete = () => {
    this.setState({ loading: true });
    deleteExamQuestion(this.state.id).then(() => {
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
          title={this.state.id ? "Editar Pregunta" : "Crear nueva pregunta"}
          onCancel={() => this.props.navigation.goBack()}
          onDone={this.onSave}
          doneLabel={this.state.id ? "Guardar" : "Listo!"}
          doneButtonProps={{
            disabled: !this.state.changed || !this.state.shouldEdit,
          }}
        />
        <View paddingL-30 paddingR-30 flex>
          <TextInput
            text70
            containerStyle={{marginBottom: 30}}
            floatingPlaceholder
            placeholder="Pregunta"
            onChangeText={(question) => this.setState({ changed: true, question })}
            multiline
            value={this.state.question}
            floatOnFocus
          />
          <TextInput
            text70
            floatingPlaceholder
            placeholder="Respuesta correcta"
            onChangeText={(option) => this.onChangeOption(option,0)}
            multiline
            placeholderTextColor={Colors.green10}
            floatingPlaceholderColor={Colors.green10}
            value={this.state.options[0]}
            floatOnFocus
          />
          <TextInput
            text70
            floatingPlaceholder
            placeholder="Respuesta incorrecta 1"
            onChangeText={(option) => this.onChangeOption(option,1)}
            multiline
            placeholderTextColor={Colors.red10}
            floatingPlaceholderColor={Colors.red10}
            value={this.state.options[1]}
            floatOnFocus
          />
          <TextInput
            text70
            floatingPlaceholder
            placeholder="Respuesta incorrecta 2"
            onChangeText={(option) => this.onChangeOption(option,2)}
            multiline
            placeholderTextColor={Colors.red10}
            floatingPlaceholderColor={Colors.red10}
            value={this.state.options[2]}
            floatOnFocus
          />
          { this.state.id && (
            this.state.shouldDelete && this.state.shouldEdit ? <Button
              label="Eliminar pregunta"
              enableShadow
              backgroundColor={Colors.red20}
              marginT-50
              onPress={this.onDelete}
            /> : <Text text80 marginT-50 style={{ color: Colors.dark60, textAlign: "center" }}>
              {this.state.shouldEdit ? 
                "No puedes eliminar esta pregunta porque el examen está activo y necesita tener por lo menos 3 preguntas. Puedes desactivar el examen e intentar nuevamente" : 
                "No puedes editar esta pregunta porque ya fue respondida"
              }
            </Text> 
          )}
        </View>
      </View>
    );
  }
}