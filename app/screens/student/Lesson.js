import React from 'react';
import axios from 'axios';
import { ActivityIndicator, ScrollView, Animated, SectionList,FlatList, View, Alert, Image, TouchableOpacity } from 'react-native';
import {
  SafeAreaView,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';

import Carousel from 'react-native-snap-carousel';
import { StatsCol } from './../../components/StatsCol';
import { Label } from './../../components/Label';

import { sliderWidth, itemWidth } from './../../styles/SliderEntry.style';
import { Colors, Button, Text, Card } from 'react-native-ui-lib';
import { BlurView } from 'react-native-blur';

import { getLesson, getAttendance, getExam, getLessonFeedback } from '../../services/student';
import label from './../../utils/label';

export class LessonScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('subject', {}).name,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      currentClass: 0,
      fadeAnim: new Animated.Value(0), // init opacity 0
      subject: props.navigation.getParam('subject', {}),
      lesson: {},
      attendance: [],
      studentExams: [],
      loadingFeedback: false,
    }
  }

  componentDidMount() {
    let currentClass = 0;
    this.state.subject.lessons.forEach((lesson, index) => {
      if(lesson.done) currentClass = index + 1;
    })
    this.loadLesson(currentClass)
    this.setState({ currentClass });
  }

  loadImageStart = () => {
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 0,duration: 500},
    ).start();
  }

  loadImageEnd = () => {
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 1,duration: 500},
    ).start();
  }

  loadData = () => {
    this.setState({ loading: true })
    /*getSubject(this.state.subject.id).then((subject) => {
      this.setState({ lessonApi, loading: false, refreshing: false })
    })*/
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    //this.loadData();
  }

  onSelectLesson = (slideIndex) => {
    this.loadImageStart();
    this.loadLesson(slideIndex);
  }

  resolveExam = () => {
    Alert.alert(
      '¡Atención!',
      'No podrás salir del examen antes de finalizar el mismo. Tampoco podrás cambiar de pestaña o el examen se anulará',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Continuar', onPress: () => this.props.navigation.navigate('Exam', { 
          lesson: this.state.lesson,
          onFinish: () => {
            this.loadLesson(this.state.currentClass)
          }
        })},
      ],
      { cancelable: false }
    )
  }

  loadLesson = (slideIndex) => {
    const lesson = this.state.subject.lessons[slideIndex];
    this.setState({ lesson, loading: true, loadingAttendance: true, loadingFeedback: true })
    getLesson(lesson.id).then((lesson) => {
      this.state.subject.lessons[slideIndex] = lesson;
      this.setState({ 
        lesson,
        subject: this.state.subject, 
        background: lesson.picture_url,
      });
      getExam(lesson.exam.id).then(studentExams => {
        this.setState({ 
          studentExams,
          loading: false
        });
      })
    })
    getAttendance(lesson.date).then((attendance) => this.setState({ attendance, loadingAttendance: false }))
    getLessonFeedback(lesson.id).then((feedbacks) => this.setState({ feedback: feedbacks[0], loadingFeedback: false }))
  }

  _renderItem ({item, index}) {
    const showMoreTopics = item.topics_count > 3;
    const topics = item.topics && (showMoreTopics ? item.topics.slice(0,2) : item.topics);
    const topicLoadingMsg = `Cargando ${item.topics_count} tema${item.topics_count != 1 ? "s" : ""}...`;
    const topicLoadedMsg = `y ${item.topics_count - 3} tema${item.topics_count - 3 != 1 ? "s" : ""} más`;
    const topicsMsg = topics ? topicLoadedMsg : topicLoadingMsg;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.props.navigation.push('Program', { lesson: item })}
      >
        <View style={style.carousel.slide}>
          <View style={style.carousel.slide_header}>
            <Text style={style.carousel.slide_header_title}>{ item.title }</Text>
            {item.done && <Ionicons
              name="ios-checkmark-circle"
              size={26}
              style={style.carousel.slide_header_icon}
            />}
          </View>
          <View style={style.carousel.slide_topics}>
            {topics && topics.map(topic =>
              <Text
                key={topic.id}
                style={style.carousel.slide_topics_item}>
                { topic.title }
              </Text>
            )}
            {item.topics_count > 0 && (!topics || showMoreTopics) && 
              <Text style={style.carousel.slide_topics_item}>{topicsMsg}</Text>
            }
          </View>
          {(item.exam_enabled || item.homeWork) && <View style={style.carousel.slide_footer}>
            {item.exam_enabled && <Label text='EXAMEN' color='red'/>}
            {item.homeWork && <Label text='TAREA' color='skyblue'/>}
          </View>}
        </View>
      </TouchableOpacity>
    );
  }

  render () {
    const navigation = this.props.navigation;
    const { subject, lesson, attendance, studentExams, loadingFeedback, feedback } = this.state;
    const attendanceMsg = attendance.length > 0 ? label[attendance[0].present_code] : "Ausente";
    const canDoExam = !this.state.loading && studentExams.length == 0;
    const studentExam = studentExams[0];
    const loading = this.state.loadingFeedback || this.state.loading || this.state.loadingAttendance;

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.7
          }}>
            <Animated.Image
              style={{
                flex: 1,
                height: 200,
                opacity: this.state.fadeAnim
              }}
              source={{ uri: this.state.background }}
              onLoadStart={(e) => this.loadImageStart()}
              onLoadEnd={(e) => this.loadImageEnd()}
            />
          </View>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            firstItem={this.state.currentClass}
            data={this.state.subject.lessons}
            renderItem={this._renderItem.bind(this)}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            containerCustomStyle={style.carousel.slider}
            onSnapToItem={(slideIndex) => this.onSelectLesson(slideIndex)}
          />
        </View>
        

        {loading ? <ActivityIndicator style={{ marginTop: 20 }} /> : <ScrollView>
          {lesson.exam_enabled == true && canDoExam && <View style={style.exam}>
            <Text text60 style={style.examText}>Esta clase tiene un examen asignado</Text>
            {this.state.loading ? <ActivityIndicator color="#ffffff" style={{ marginTop: 10 }}/> : 
              canDoExam && <Button
                style={style.examButton}
                text70
                label={this.state.loading ? "" : "Realizar examen"}
                onPress={() => this.resolveExam() }
                title="Examen"
                disabled={this.state.loading}
              />
            }
          </View>}
          <TableView>
            <Section header="Esta clase" sectionTintColor='transparent'>
              <Cell
                cellStyle="RightDetail"
                title="Fecha"
                detail={lesson.date}
              />
              {lesson.exam_enabled && <Cell
                cellStyle="RightDetail"
                title="Examen de clase"
                titleTextColor={studentExam ? studentExam.student_exam_qualification.score >= 7 ? Colors.green10 : Colors.red10 : null}
                accessory={studentExam ? null : "DisclosureIndicator"}
                detail={!studentExam ? "Resolver" : studentExam.student_exam_qualification.score}
                onPress={() => studentExam ? /* navigation.push('ViewExam', { exam: studentExam }) */ null : this.resolveExam()}
              />}
              <Cell
                cellStyle="RightDetail"
                title="Asistencia"
                detail={attendanceMsg}
              />
              <Cell
                cellStyle="RightDetail"
                title="Notificaciones y comentarios"
                detail={"Sin novedades"}
              />
              <Cell
                cellStyle={loadingFeedback ? null : "RightDetail"}
                accessory={feedback ? null : "DisclosureIndicator"}
                //detail={feedback ? `${feedback.value}⭐` : ""}
                detail={feedback ? "" : ""}
                title={feedback ? "Clase evaluada" : "Evaluar clase" + (lesson.teacher ? ` dictada por ${lesson.teacher.first_name} ${lesson.teacher.last_name}` : "")}
                titleTextColor="#007AFF"
                onPress={() => feedback ? null : navigation.navigate('Feedback', { 
                  lesson,
                  onFinish: () => {
                    this.loadLesson(this.state.currentClass)
                  }
                })}
                cellAccessoryView={loadingFeedback ? <ActivityIndicator /> : null}
              />
            </Section>
            <Section header="Información de la materia" sectionTintColor='transparent'>
              <Cell
                cellStyle="RightDetail"
                title="Tu promedio actual"
                detail={"7.50"}
              />
              <Cell
                cellStyle="RightDetail"
                title="Día de cursada"
                detail={label[subject.day]}
              />
              <Cell
                accessory="DisclosureIndicator"
                cellStyle="RightDetail"
                title="Notificaciones y comentarios"
                detail={"3"}
                onPress={() => this.setState({ half: true })}
              />
            </Section>
          </TableView>
        </ScrollView>}
      </View>
    );
  }
};

const style = {
  exam: {
    backgroundColor: Colors.orange40,
    padding: 20,
  },
  examText: {
    color: "#fff",
    textAlign: "center"
  },
  examButton: {
    marginTop: 10,
    backgroundColor: Colors.orange10,
  },
  carousel: {
    slide: {
      height: 200,
      backgroundColor: '#FFFFFFAA',
      shadowOpacity: 0.75,
      shadowRadius: 10,
      shadowColor: '#999',
      borderRadius: 10,
      shadowOffset: { height: 10, width: 0 },
      padding: 15,
    },
    slide_header: {
      flex: 1,
      flexDirection:'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    slide_header_number: {
      fontSize: 22,
    },
    slide_header_title: {
      fontSize: 22,
      alignSelf: 'flex-start',
      marginRight: 20,
    },
    slide_header_icon: {
      marginLeft: 'auto',
      marginBottom: 'auto',
      padding: 2,
      color: 'green'
    },
    slide_topics_item: {
      fontSize: 14,
      paddingTop: 4,
      //paddingHorizontal: 5,
      color: '#666'
    },
    slide_footer: {
      flexDirection: 'row',
      paddingTop: 10,
    },
    slider: {
      paddingVertical: 25,
    }
  }
}


/*
program: [
        {
          classNumber: 1,
          title: 'Inicio de la Primera Guerra Mundial',
          description: '',
          topics: [
            'Causas de la Primera Guerra Mundial',
            'El Inicio de la Gran Guerra',
            'Desarrollo de la Guerra'
          ],
          status: true,
          exam: false,
          done: true
        },
        {
          classNumber: 2,
          title: 'Fases de la Primera Guerra Mundial',
          description: '',
          topics: [
            'Primera Fase (1914)',
            'Segunda Fase (de 1915 a 1916)',
            'Tercera - Fase Final (1917 a 1918)'
          ],
          status: true,
          exam: true,
          done: false
        },
        {
          classNumber: 3,
          title: 'Fin de la Primera Guerra Mundial',
          description: '',
          topics: ['Tratado de Versalles'],
          status: true,
          exam: true,
          done: false
        },
        {
          classNumber: 4,
          title: 'Consecuencias de la Primera Guerra Mundial',
          description: '',
          topics: ['Imperio otomano y austro-húngaro','Liga de las Naciones','Crisis económicas en Europa'],
          status: true,
          exam: false,
          done: false,
          homeWork: true,
        }
      ],
*/