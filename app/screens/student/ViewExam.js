import React, {Component} from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {RefreshControl, StyleSheet, Alert, ScrollView, Switch,ActivityIndicator} from 'react-native';
import { Cell, TableView, Section, Separator } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import {ListItem,  Text,  BorderRadiuses, Colors, ThemeManager, View, TextInput, LoaderScreen, Toast} from 'react-native-ui-lib';//eslint-disable-line

export class ViewExamScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:  `Examen`, 
    };
  };

  render() {
    const exams = this.props.navigation.getParam('exam', []);

    console.log(exams);

    return (
      <ScrollView>
        <TableView>
          {exams.map((exam) => <Section header='Preguntas' sectionTintColor='transparent'>
            {exam.student_answers.map(answer => (
              <Cell
                key={answer.id}
                cellStyle="Basic"
                title={answer.answer}
                accessory="DisclosureIndicator"
              />
            ))}
          </Section>)}
        </TableView>
      </ScrollView>
    );
  }
}