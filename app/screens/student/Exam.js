import React from 'react';
import { ScrollView, StatusBar, SectionList,FlatList, Alert, AppState, Dimensions } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Card, Avatar, Picker, TagsInput, TextArea} from 'react-native-ui-lib';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { Stars } from './../../components/Stars';

const colors = [Colors.blue30,Colors.cyan30,Colors.purple30];

export class ExamScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      questions: [
        {
          id: 1,
          text: '¿Cuál de los siguientes países perteneció a la triple entente?',
          answers: ['Italia','Francia','Estados Unidos']
        },
        {
          id: 1,
          text: '¿El asesinato de qué dirigente fue uno de los desencadenantes de la Primera Guerra Mundial?',
          answers: ['Guillermo II','Francisco Fernando','Francisco José']
        },
        {
          id: 1,
          text: '¿Cuántos años tenés?',
          answers: ['22','23','24']
        }
      ],
      answers: [],
      current: 0,
    }
    this.addAnswer = this.addAnswer.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      Alert.alert(
        'Examen anulado',
        'Detectamos un cambio de aplicación, tu examen fué anulado',
        [
          {text: 'Volver', onPress: () => this.props.navigation.goBack()},
        ],
        { cancelable: false }
      )
    }
    this.setState({appState: nextAppState});
  }

  addAnswer = (qid, aid) => {
    this.state.answers.push({id: qid,answer: aid});
    this.setState({
      answers: this.state.answers,
      current: this.state.current + 1
    });
  }

  render() {
    const { current, questions } = this.state;
    const question = questions[current];
    return (
      <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: "#ffffff", padding: 20 }}>
        <StatusBar hidden={true} />
        <View style={{ flex: 1, justifyContent: 'center',alignItems: 'center', }}>
          <ProgressBarAnimated
            width={Dimensions.get('screen').width - 30}
            value={current / questions.length * 100}
            backgroundColorOnComplete="#6CC644"
          />
        </View>
        {questions.length > current ?
          <View style={{ flex: 4, padding: 20, }}>
            <Text style={{ fontSize: 24, textAlign: "center" }}>{question.text}</Text>
            <View style={{ padding: 20, }}>
              {question.answers.map((answer, aid) =>
                <Button
                  key={answer}
                  backgroundColor={colors[aid]}
                  label={answer}
                  text50
                  borderRadius={7}
                  style={{height: 45, marginTop: 20 }}
                  onPress={() => this.addAnswer(question.id,aid)}
                  enableShadow
                />
              )}
            </View>
          </View>
        :
          <View style={{ flex: 4 }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>¡Examen finalizado!</Text>
            <Text style={{ fontSize: 70, textAlign: "center", color: Colors.green30 }}>7</Text>
            <Text style={{ fontSize: 28, textAlign: "center", color: Colors.green10 }}>APROBASTE</Text>
            <Text text70 marginT-70 marginB-40 style={{ color: Colors.dark30, textAlign: "center" }}>¿Cómo fué tu experiencia?</Text>
            <Stars
              disabled={false}
              maxStars={5}
              rating={3}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
            <Button
              onPress={() => this.props.navigation.goBack()}
              label="Cerrar"
            />
          </View>
        }
        <View style={{ flex: 1 }}>
          <Text text70 marginB-40 style={{ color: Colors.dark30, textAlign: "center" }}>Te recordamos que no podés cambiar de aplicación ni modificar tus respuestas durante el examen.</Text>
          {questions.length > current ?
            <Text text50 style={{ color: Colors.dark10, textAlign: "center" }}>Pregunta {current+1} de {questions.length}</Text>: null
          }
        </View>
      </View>
    )
  }
}
