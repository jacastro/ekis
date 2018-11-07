import React, {Component} from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {SwipeableFlatList, StyleSheet, Alert, Image, Switch} from 'react-native';
import { Cell, TableView, Section, Separator } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import {ListItem,  Text,  BorderRadiuses, Colors, ThemeManager, View, TextInput, LoaderScreen} from 'react-native-ui-lib';//eslint-disable-line
import * as Animatable from 'react-native-animatable';

export class ExamTeacherScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:  `Examen clase ${navigation.getParam('lesson', {}).id + 1}`, 
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      enabled: this.props.navigation.getParam('lesson', {}).exam,
      loading: false,
      questions: [
        {
          id: 1,
          text: '¿Cuánto es 2x2?',
          options: ['2','3','4'],
        },
        {
          id: 2,
          text: '¿Cómo te llamás?',
          options: ['a','b','c']
        },
        {
          id: 3,
          text: '¿Cuántos años tenés?',
          options: ['22','23','24']
        }
      ],
    };
  }

  enableExam = (value) => {
    
    // make call
    this.setState({ loading: true, enabled: value });
    setTimeout(() => {
      this.setState({ loading: false });
      this.props.navigation.getParam('onSaveExam', {})(this.state);
    }, 1000);
  }

  render() {
    const lesson = this.props.navigation.getParam('lesson', {});
    return (
      <View flex>
        {this.state.loading && <LoaderScreen
          overlay
          backgroundColor={Colors.rgba(Colors.dark80, 0.85)}
        />}
        <TableView>
          <Section sectionTintColor='transparent'>
            <Cell
              title={`Clase: ${lesson.title}`}
              cellStyle="Basic"
            />
            <Cell
              title="Activar examen"
              cellStyle="Basic"
              cellAccessoryView={<Switch 
                value={this.state.enabled}
                onValueChange={value => this.enableExam(value)}
              />}
              contentContainerStyle={{ paddingVertical: 4 }}
            />
          </Section>
          {this.state.enabled && <Section header='Preguntas' sectionTintColor='transparent'>
            {this.state.questions.map((question, index) => (
              <Cell
                key={question.id}
                cellStyle="Basic"
                title={question.text}
                accessory="DisclosureIndicator"
                onPress={() => this.props.navigation.navigate('EditExam', { 
                  question, 
                  onSave: (topic) => {
                    lesson.topics[index] = topic;
                    this.props.navigation.setParams({ lesson })
                    this.props.navigation.getParam('onChange', {})(lesson)
                  }
                })}
              />
            ))}
            <Separator/>
            <Cell
              cellStyle="Basic"
              title="Agregar"
              titleTextColor="#007AFF"
              accessory="DisclosureIndicator"
              onPress={() => this.props.navigation.navigate('EditExam', {
                onSave: (topic) => {
                  lesson.topics.push(topic);
                  this.props.navigation.setParams({ lesson })
                  this.props.navigation.getParam('onChange', {})(lesson)
                }
              })}
            />
          </Section>}
        </TableView>
      </View>
    );
  }
}