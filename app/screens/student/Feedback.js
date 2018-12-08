import React from 'react';
import { ScrollView, ActivityIndicator, SectionList,FlatList, Alert, AppState, Dimensions } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Card, Avatar, Picker, TagsInput, TextArea} from 'react-native-ui-lib';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { Stars } from './../../components/Stars';

import { saveLessonFeedback, saveTeacherFeedback } from '../../services/student';

export class FeedbackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.navigation.getParam('type', 'lesson'),
      title: props.navigation.getParam('title', 'Evaluar Clase 2'),
      description: props.navigation.getParam('description', 'Fases de la Primera Guerra Mundial'),
      lesson: props.navigation.getParam('lesson', {}),
      rate: 3,
      comment: "",
      step: 0,
      loading: false,
    }
  }

  onFeedbackLesson = () => {
    this.setState({ loading: true });
    saveLessonFeedback(this.state.lesson.id, this.state.rate, this.state.comment).then(feedback => {
      this.setState({ loading: false, step: 1, comment: "" })
    })
  }

  onFeedbackTeacher = () => {
    this.setState({ loading: true });
    saveTeacherFeedback(this.state.lesson.teacher.id, this.state.rate, this.state.comment).then(feedback => {
      this.setState({ loading: false });
      this.props.navigation.getParam('onFinish', {})();
      this.props.navigation.goBack();
    })
  }

  render() {
    const { rate, comment, lesson, step, loading } = this.state;

    console.log(lesson);

    return (
      <View useSafeArea flex style={{ backgroundColor: "#ffffff" }}>
        <View padding-30>
          <View paddingB-30>
            <Text text30>{step == 0 ? `Evaluar Clase ${lesson.class_number}` : `Evaluar al docente`}</Text>
            <Text text60>{step == 0 ? lesson.title : `${lesson.teacher.first_name} ${lesson.teacher.last_name}`}</Text>
          </View>
          <View paddingB-30>
            <Stars
              disabled={false}
              maxStars={5}
              rating={rate}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              selectedStar={(rate) => this.setState({ rate })}
              fullStarColor={Colors.yellow20}
            />
          </View>
          <TextInput
            text70
            containerStyle={{marginBottom: 10}}
            floatingPlaceholder
            placeholder="Comentarios"
            onChangeText={(comment) => this.setState({ comment })}
            value={comment}
            floatOnFocus
          />
          <Text text70 marginB-40 style={{ color: Colors.dark60, textAlign: "center" }}>
            El docente no podrá ver quién realizó este comentario
          </Text>
          <Button
            onPress={() => step == 0 ? this.onFeedbackLesson() : this.onFeedbackTeacher()}
            label={loading ? "" : step == 0 ? "Continuar" : "Finalizar"}
            disabled={loading}
          >
            {loading && <ActivityIndicator color="#ffffff"/>}
          </Button>
        </View>
      </View>
    )
  }
}
