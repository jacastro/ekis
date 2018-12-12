import React, {Component} from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {RefreshControl, StyleSheet, Alert, ScrollView, Switch,ActivityIndicator} from 'react-native';
import { Cell, TableView, Section, Separator } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import { Stars } from './../../components/Stars';
import {ListItem,  Text,  BorderRadiuses, Colors, ThemeManager, View, Card} from 'react-native-ui-lib';//eslint-disable-line
import * as Animatable from 'react-native-animatable';
import { getExam, enableExam, getStudentExams, getExamFeedback } from '../../services/teacher';

export class FeedbackScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:  `Feedback`, 
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      feedbacks: props.navigation.getParam('feedbacks', []),
      teacherFeedbacks: props.navigation.getParam('teacherFeedbacks', []),
    };
  }

  render() {
    const { feedbacks, teacherFeedbacks } = this.state;

    return (
      <ScrollView>
        <View margin-20>
          <Text text70 color={Colors.dark10} marginB-15>Comentarios de la clase</Text>
          {feedbacks.map(feedback => <Card key={feedback.id} style={styles.ratesViewCard}>
            <View>
              <Text text60>{feedback.comments}</Text>
            </View>
            <Card.Section>
              <Card.Item>
                <Stars
                  containerStyle={{marginLeft: "auto"}}
                  starSize={16}
                  fullStarColor={Colors.yellow20}
                  disabled={false}
                  maxStars={5}
                  rating={feedback.value}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet={'Ionicons'}
                />
              </Card.Item>
            </Card.Section>
          </Card>)}
          <Text text70 color={Colors.dark10} marginB-15 marginT-25>Acerca de tu desempeño</Text>
          {teacherFeedbacks.map(feedback => <Card key={feedback.id} style={styles.ratesViewCard}>
            <View>
              <Text text60>{feedback.comments}</Text>
            </View>
            <Card.Section>
              <Card.Item>
                <Stars
                  containerStyle={{marginLeft: "auto"}}
                  starSize={16}
                  fullStarColor={Colors.yellow20}
                  disabled={false}
                  maxStars={5}
                  rating={feedback.value}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet={'Ionicons'}
                />
              </Card.Item>
            </Card.Section>
          </Card>)}
        </View>
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
  ratesViewCard: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    marginBottom: 15,
  }
});
