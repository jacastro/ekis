import React, {Component} from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {SwipeableFlatList, StyleSheet, Alert, Image, ScrollView, Switch} from 'react-native';
import { Cell, TableView, Section, Separator } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import {ListItem,  Text,  BorderRadiuses, Colors, ThemeManager, View, TextInput} from 'react-native-ui-lib';//eslint-disable-line
import * as Animatable from 'react-native-animatable';

export class LessonScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:  `Clase ${navigation.getParam('lesson', {}).id + 1}`, 
      headerRight: (
        <Button
          onPress={() => console.log("save")}
          title="Guardar"
        />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      lesson: props.navigation.getParam('lesson', {}),
      program: props.navigation.getParam('program', {}),
    };
  }

  render() {
    const lesson = this.props.navigation.getParam('lesson', {});
    return (
      <ScrollView>
        <TableView>
          <Section header="Información de clase" sectionTintColor='transparent'>
            <Cell
              cellContentView={
                <TextInput
                  text70
                  containerStyle={{marginBottom: -20,paddingBottom: 0, flex: 1}}
                  placeholder="Escribe un título"
                  value={lesson.title}
                  titleColor={{default: '#000000', error: 'red', focus: 'blue'}}
                  hideUnderline 
                />
              }
            />
            <Cell
              cellContentView={
                <TextInput
                  text70
                  containerStyle={{marginBottom: -20,paddingBottom: 0, flex: 1}}
                  placeholder="Escribe una descripción"
                  value={lesson.description}
                  hideUnderline 
                />
              }
            />

            
            <Cell
              title="Examen"
              accessory="DisclosureIndicator"
              cellStyle="RightDetail"
              detail={lesson.exam ? 'Activado' : 'No'}
              onPress={() => this.props.navigation.navigate('Exam', {
                lesson,
                onSaveExam: (exam) => {
                  lesson.exam = exam.enabled;
                  this.props.navigation.setParams({ lesson })
                  //this.props.navigation.getParam('onChange', {})(lesson)
                }
              })}
            />
            <Cell
              title="Finalizado"
              cellStyle="Basic"
              cellAccessoryView={<Switch 
                value={lesson.done} />}
              contentContainerStyle={{ paddingVertical: 4 }}
            />
            <Cell
              cellStyle="Basic"
              title="Imagen de clase"
              accessory="DisclosureIndicator"
              onPress={() => this.props.navigation.navigate('Exam', {
                lesson,
              })}
              image={
                <Image
                  style={{ borderRadius: 5 }}
                  source={{
                    uri: lesson.image,
                  }}
                />
              }
            />
          </Section>
          <Section header="Temas" sectionTintColor='transparent'>
            {lesson.topics.map((topic, index) => (
              <Cell
                key={topic.title}
                cellStyle="Basic"
                title={topic.title}
                accessory="DisclosureIndicator"
                onPress={() => this.props.navigation.navigate('EditTopic', { 
                  topic, 
                  program: this.state.program,
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
              title="Agregar tema"
              titleTextColor="#007AFF"
              accessory="DisclosureIndicator"
              onPress={() => this.props.navigation.navigate('EditTopic', {
                program: this.state.program,
                onSave: (topic) => {
                  lesson.topics.push(topic);
                  this.props.navigation.setParams({ lesson })
                  this.props.navigation.getParam('onChange', {})(lesson)
                }
              })}
            />
          </Section>
        </TableView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
});
