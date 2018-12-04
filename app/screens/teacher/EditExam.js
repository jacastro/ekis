import React, {Component} from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {RefreshControl, StyleSheet, Alert, ScrollView, Switch,ActivityIndicator} from 'react-native';
import { Cell, TableView, Section, Separator } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import {ListItem,  Text,  BorderRadiuses, Colors, ThemeManager, View, TextInput, LoaderScreen, Toast} from 'react-native-ui-lib';//eslint-disable-line
import * as Animatable from 'react-native-animatable';
import { getExam, enableExam, getStudentExams } from '../../services/teacher';
export class ExamTeacherScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:  `Examen`, 
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      //enabled: this.props.navigation.getParam('lesson', {}).exam,
      enabled: true,
      loading: true,
      refreshing: false,
      lesson: props.navigation.getParam('lesson', {}),
      studentExams: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true })
    getExam(this.state.lesson.exam.id).then((exam) => {
      getStudentExams(this.state.lesson.exam.id).then(studentExams => {
        this.setState({ ...exam, loading: false, refreshing: false, studentExams })
      }) 
    })
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    this.loadData();
  }

  enableExam = (value) => {
    this.setState({ enabled: value });
    enableExam(this.state.id, value).then(() => {
      this.props.navigation.getParam('onSaveExam', {})( value );
    });
  }

  render() {
    const { lesson, enabled, questions, loading, id, studentExams } = this.state;
    const shouldEnable = questions && questions.length >= 3;
    const shouldEdit = studentExams && studentExams.length == 0;

    return (
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <TableView>
          <Section sectionTintColor='transparent'>
            <Cell
              title={`Clase: ${lesson.title}`}
              cellStyle="Basic"
            />
            { loading ? <Cell
              title="Buscando examen"
              cellAccessoryView={<ActivityIndicator />}
              contentContainerStyle={{ paddingVertical: 4 }}
            /> : <Cell
              title="Activar examen"
              cellStyle="Basic"
              cellAccessoryView={<Switch 
                value={shouldEnable && enabled == true}
                disabled={!shouldEnable || !shouldEdit}
                onValueChange={value => this.enableExam(value)}
              />}
              contentContainerStyle={{ paddingVertical: 4 }}
            />}
            <Toast
              visible={(!loading && !shouldEnable)}
              position="relative"
              message="Debes haber cargado por lo menos 3 preguntas para habilitar el examen"
              backgroundColor={Colors.yellow20}
              color={Colors.white}
            />
            <Toast
              visible={!shouldEdit}
              position="relative"
              message="No puedes editar el examen porque ya ha sido resuelto por lo menos una vez"
              backgroundColor={Colors.blue20}
              color={Colors.white}
            />
          </Section>
          { questions && <Section header='Preguntas' sectionTintColor='transparent'>
            {questions.map((question, index) => (
              <Cell
                key={question.id}
                cellStyle="Basic"
                title={question.question}
                accessory="DisclosureIndicator"
                onPress={() => this.props.navigation.navigate('EditExamQuestion', { 
                  examId: id,
                  question, 
                  shouldDelete: !enabled || questions.length > 3 ,
                  shouldEdit,
                  onSave: (question) => {
                    questions[index] = question;
                    this.setState({ questions })
                  },
                  onDelete: () => {
                    questions.splice(index, 1),
                    this.setState({ questions })
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
              onPress={() => this.props.navigation.navigate('EditExamQuestion', {
                examId: id,
                onSave: (question) => {
                  questions.push(question);
                  this.setState({ questions })
                }
              })}
            />
          </Section>}
          <Section header='Exámenes resueltos' sectionTintColor='transparent'>
            {studentExams.map(studentExam => (
              <Cell
                key={studentExam.id}
                cellStyle="Basic"
                title={studentExam.id}
                accessory="DisclosureIndicator"
                onPress={() => this.props.navigation.navigate('EditExamQuestion', { exam: studentExam })}
              />
            ))}
          </Section>
        </TableView>
      </ScrollView>
    );
  }
}