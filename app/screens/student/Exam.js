import React from 'react';
import { ScrollView, StatusBar, SectionList,ActivityIndicator, Alert, AppState, Dimensions } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Card, Avatar, Picker, TagsInput, TextArea} from 'react-native-ui-lib';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Stars } from './../../components/Stars';
import { createExam, addExamAnswer, getStudentExam } from '../../services/student';

const enableButtonColors = [Colors.blue30,Colors.cyan30,Colors.purple30];
const disableButtonColors = [Colors.blue60,Colors.cyan60,Colors.purple60];
const pressedButtonColors = [Colors.blue10,Colors.cyan10,Colors.purple10];

const timerFactor = 5;
export class ExamScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      lesson: props.navigation.getParam('lesson', {}),
      exam_questions: [],
      answers: [],
      current: 0,
      loadingCreatingExam: true,
      loadingAddingAnswer: false,
      loadingFinishingExam: false,
      timer: 0,
      answerSelected: 0,
      finished: false,
    }
    this.addAnswer = this.addAnswer.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    createExam(this.state.lesson.exam.id).then(studentExam => {
      this.setState({
        studentExamId: studentExam.id,
        exam: studentExam.exam,
        exam_questions: studentExam.exam.exam_questions.map(question => ({
          id: question.id,
          question: question.question,
          options: question.options.filter(option => option != ""),
        })),
        loadingCreatingExam: false,
      })
      this.startCountdown();
    })
  }

  startCountdown() {
    this._interval = setInterval(() => {
      if(this.state.timer >= 100) this.addAnswer(this.state.exam_questions[this.state.current].id, "", 4)
      else this.setState({ timer: this.state.timer + timerFactor })
    }, 1000);
  }

  endCountdown() {
    clearInterval(this._interval);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    this.endCountdown();
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      endCountdown();
      Alert.alert(
        'Examen anulado',
        'Detectamos un cambio de aplicación, tu examen fué anulado',
        [
          {text: 'Volver', onPress: () => this.onClose()},
        ],
        { cancelable: false }
      )
    }
    this.setState({appState: nextAppState});
  }

  addAnswer = (questionId, answer, answerId) => {
    const finished = (this.state.current + 1) == this.state.exam_questions.length;
    this.setState({ loadingAddingAnswer: true, answerSelected: answerId });
    this.endCountdown();
    addExamAnswer(this.state.studentExamId, questionId, answer).then(answer => {
      if(!finished) {
        this.setState({ 
          current: this.state.current + 1,
          timer: 0,
          loadingAddingAnswer: false,
        });
        this.startCountdown();
      } else {
        this.setState({ 
          loadingAddingAnswer: false,
          current: this.state.current + 1,
          finished,
        });
        this.onFinishExam();
      }
    });
  }

  onFinishExam = () => {
    this.setState({ loadingFinishingExam: true });
    getStudentExam(this.state.studentExamId).then(studentExam => {
      this.setState({ loadingFinishingExam: false });
    })
  }

  onClose = () => {
    this.props.navigation.getParam('onFinish', {})();
    this.props.navigation.goBack()
  }

  render() {
    const { current, exam_questions, loadingAddingAnswer, answerSelected, finished, loadingFinishingExam } = this.state;
    const question = exam_questions[current];
    const loadingScreen = this.state.loadingCreatingExam; 
    const timerNum = (100 - this.state.timer) / timerFactor;

    return (
      loadingScreen ? <View style={{ flex: 1, justifyContent: 'center',backgroundColor: "#ffffff" }}>
        <ActivityIndicator size="large" />
        <Text text50 marginT-10 style={{ color: Colors.dark10, textAlign: "center" }}>
          {finished ? "Finalizando..." : "Creando examen..."}
        </Text>
      </View> : <View useSafeArea style={{ flex: 1, alignItems: 'center', backgroundColor: "#ffffff" }}>
        <StatusBar hidden={true} />
        <View style={{ flex: 1, alignItems: 'center', }}>
          <ProgressBarAnimated
            width={Dimensions.get('screen').width - 30}
            value={current / exam_questions.length * 100}
          />
        </View>
        {finished ?
          ( loadingFinishingExam ? 
            <View style={{ flex: 4 }}>
              <ActivityIndicator size="large" />
              <Text text50 marginT-10 style={{ color: Colors.dark10, textAlign: "center" }}>Finalizando...</Text>
            </View>
            :
            <View style={{ flex: 4 }}>
              <Text style={{ fontSize: 18, textAlign: "center" }}>¡Examen finalizado!</Text>
              <Text style={{ fontSize: 70, textAlign: "center", color: Colors.green30 }}>7</Text>
              <Text style={{ fontSize: 28, textAlign: "center", color: Colors.green10 }}>APROBASTE</Text>
              <Text text70 marginT-70 marginB-40 style={{ color: Colors.dark30, textAlign: "center" }}>¿Cómo fué tu experiencia?</Text>
              <Button
                onPress={() => this.onClose()}
                label="Cerrar"
              />
            </View>
          )
        :
          <View style={{ flex: 4, paddingHorizontal: 20, }}>
            <View style={{ alignItems: 'center', }}>
              <AnimatedCircularProgress
                size={70}
                width={6}
                fill={this.state.timer}
                tintColor={this.state.timer < 75 ? Colors.green30 : Colors.orange30 }
                backgroundColor={Colors.dark80}
                style={{ marginTop: 20,}}
              >{
                (fill) => (
                  timerNum == 0 && loadingAddingAnswer ? <ActivityIndicator color={Colors.orange20} /> : <Text text40 style={{color: this.state.timer < 75 ? Colors.green20 : Colors.orange20 }} >
                    { timerNum }
                  </Text>
                )
              }</AnimatedCircularProgress>
            </View>
            <Text style={{ fontSize: 24, textAlign: "center" }}>{question.question}</Text>
            <View style={{ padding: 20, }}>
              {question.options.map((answer, aid) => 
                <Button
                  key={answer}
                  backgroundColor={loadingAddingAnswer ? (answerSelected === aid ? pressedButtonColors[aid] : disableButtonColors[aid]) : enableButtonColors[aid]}
                  disable={loadingAddingAnswer}
                  text50
                  borderRadius={7}
                  style={{height: 45, marginTop: 20 }}
                  onPress={() => this.addAnswer(question.id, answer, aid)}
                  enableShadow
                >
                  {(loadingAddingAnswer && answerSelected === aid) && <ActivityIndicator color="#ffffff" style={{marginRight: 4 }}/>}
                  <Text text50 style={{color: "#ffffff" }}>{answer}</Text>
                </Button>
              )}
            </View>
          </View>
        }
        <View style={{ flex: 1 }}>
          <Text text70 marginB-40 style={{ color: Colors.dark30, textAlign: "center" }}>Te recordamos que no podés cambiar de aplicación ni modificar tus respuestas durante el examen.</Text>
          {exam_questions.length > current ?
            <Text text50 style={{ color: Colors.dark10, textAlign: "center" }}>Pregunta {current+1} de {exam_questions.length}</Text>: null
          }
        </View>
      </View>
    )
  }
}
