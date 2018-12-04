import React, {Component} from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {ActivityIndicator, StyleSheet, Alert, Image, ScrollView, Switch, Button,DatePickerIOS,AlertIOS,RefreshControl} from 'react-native';
import { Cell, TableView, Section, Separator } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import {ListItem,  Text,  BorderRadiuses, Colors, ThemeManager, View, TextInput, LoaderScreen} from 'react-native-ui-lib';//eslint-disable-line
import { getLesson, updateLesson, deleteLesson } from '../../services/teacher';

export class LessonScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const lesson = navigation.getParam('lesson', {});
    return {
      title:  `Clase ${lesson.class_number}`, 
      headerRight: (
        <Button
          onPress={navigation.getParam('saveLesson',() => console.log("unmounted"))} 
          title="Guardar"
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    const lessonShot = props.navigation.getParam('lesson', {});
    const date = lessonShot.date.split("-")
    this.state = {
      lessonShot,
      loading: true,
      date: new Date(date[0],date[1]-1,date[2]),
      topics_count: lessonShot.topics_count,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ saveLesson: this._onSave });
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true })
    getLesson(this.state.lessonShot.id).then((lessonApi) => {
      this.setState({ lessonApi, loading: false, refreshing: false })
    })
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    this.loadData();
  }

  _onSave = () => {
    const { lessonShot, lessonChanges } = this.state;
    this.setState({ loading: true });
    updateLesson(lessonShot.id, lessonChanges).then(lessonApi => {
      this.setState({ lessonApi, loading: false });
      this._onChange();
      this.props.navigation.goBack();
    })
  };

  _onChange = () => {
    const { lessonShot, topics_count, lessonChanges } = this.state;

    this.props.navigation.getParam('onChange', {})({ 
      ...lessonShot,
      ...lessonChanges,
      topics_count
    });
  };

  setDate = (newDate) => {
    const chosenDate = newDate.toJSON();
    const date = chosenDate.substring(0,chosenDate.indexOf("T"))
    this.setState({ 
      date: newDate,
      lessonChanges: { ...this.state.lessonChanges, date },
    })
  }

  render() {
    const { lessonShot, lessonApi, lessonChanges, loading } = this.state;
    const lesson = { 
      ...lessonShot, 
      ...lessonApi,
      ...lessonChanges, 
    }

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
          <Section header="Información de clase" sectionTintColor='transparent'>
            <Cell
              cellContentView={
                <TextInput
                  text70
                  containerStyle={{marginBottom: -20,paddingBottom: 0, flex: 1}}
                  placeholder="Escribe un título"
                  value={lesson.title}
                  titleColor={{default: '#000000', error: 'red', focus: 'blue'}}
                  onChangeText={title => this.setState({ lessonChanges: { ...lessonChanges, title } })}
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
                  onChangeText={description => this.setState({ lessonChanges: { ...lessonChanges, description } })}
                  hideUnderline
                  expandable
                  numberOfLines={1}
                />
              }
              contentContainerStyle={{ paddingVertical: 4 }}
            />

            { loading ? <Cell
              title="Buscando examen"
              cellAccessoryView={<ActivityIndicator />}
            /> : <Cell
              title="Examen"
              accessory="DisclosureIndicator"
              cellStyle="RightDetail"
              detail={lesson.exam.enabled ? 'Activado' : 'No'}
              onPress={() => this.props.navigation.navigate('Exam', {
                lesson,
                onSaveExam: (examEnabled) => {
                  lessonApi.exam.enabled = examEnabled;
                  this.setState({ lessonApi })
                }
              })}
            />}
            
            <Cell
              title="Finalizado"
              cellStyle="Basic"
              cellAccessoryView={<Switch
                value={lesson.done} 
                onValueChange={done => this.setState({ lessonChanges: { ...lessonChanges, done } })}
              />}
              contentContainerStyle={{ paddingVertical: 4 }}
            />
            <Cell
              cellStyle="Basic"
              title="Imagen de clase"
              accessory="DisclosureIndicator"
              onPress={() => AlertIOS.prompt(
                'Cambiar imagen',
                'Ingresa la url de la nueva imagen para continuar',
                picture_url => this.setState({ lessonChanges: { ...lessonChanges, picture_url } })
              )}
              image={
                <Image
                  style={{ borderRadius: 5 }}
                  source={{ uri: lesson.picture_url }}
                />
              }
            />
          </Section>

          <DatePickerIOS
            mode="date"
            date={this.state.date}
            onDateChange={(date) => this.setDate(date)}
          />

          { loading ? <LoaderScreen /> : <Section header="Temas" sectionTintColor='transparent'>
            {lesson.topics && lesson.topics.map((topic, index) => (
              <Cell
                key={topic.title}
                cellStyle="Basic"
                title={topic.title}
                accessory="DisclosureIndicator"
                onPress={() => this.props.navigation.navigate('EditTopic', { 
                  topic, 
                  onSave: (topic) => {
                    lesson.topics[index] = topic;
                    this.props.navigation.setParams({ lesson });
                    this.props.navigation.getParam('onChange', {})(lesson);
                  },
                  onDelete: () => {
                    lesson.topics.splice(index, 1),
                    this.setState({ topics_count: lesson.topics.length }, this._onChange);
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
                lesson,
                onSave: (topic) => {
                  const topics_count = lesson.topics.push(topic);
                  this.props.navigation.setParams({ lesson });
                  this.props.navigation.getParam('onChange', {})(lesson);
                  this.setState({ topics_count }, this._onChange);
                }
              })}
            />
          </Section> }

          <Section sectionTintColor='transparent'>
            <Cell
              title={`Eliminar clase`}
              titleTextColor={Colors.red10}
              accessory="DisclosureIndicator"
              onPress={() => Alert.alert(
                `Eliminar clase ${lesson.class_number}`,
                `¿Estás seguro que deseas eliminar la clase sobre ${lesson.title}?`,
                [
                  {text: 'No', onPress: () => console.log("no se borró")},
                  {text: 'Si, borrar', onPress: () => deleteLesson(lesson.id).then(() => {
                    this.props.navigation.getParam('deleteLesson', {})( lesson );
                    this.props.navigation.goBack();
                  })},
                ],
              )}
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
