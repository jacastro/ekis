/**
 * @flow
 */

import React from 'react';
import { ActivityIndicator, ScrollView, StatusBar, Text, SectionList,FlatList, View, Alert, AppState } from 'react-native';
import {
  SafeAreaView,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { Cell, Section, TableView } from 'react-native-tableview-simple';

import { ProfileScreen } from '../screens/Profile';
import { TeacherHomeScreen } from '../screens/teacher/TeacherHome';
import { SubjectTeacherScreen } from '../screens/teacher/Subject';
import { LessonScreen } from '../screens/teacher/Lesson';
import { EditTopicScreen } from '../screens/teacher/EditTopic';
import { ExamTeacherScreen } from '../screens/teacher/EditExam';
import { EditExamQuestionScreen } from '../screens/teacher/EditExamQuestion';
import { FeedbackScreen } from '../screens/teacher/Feedback';

const MenuNavigation = createStackNavigator({
  Root: {
    screen: TeacherHomeScreen,
  },
  LessonList: {
    screen: SubjectTeacherScreen,
  },
  Lesson: {
    screen: LessonScreen,
  },
  Exam: {
    screen: ExamTeacherScreen,
  },
  Feedback: {
    screen: FeedbackScreen,
  },
});

export default createStackNavigator(
  {
    Main: MenuNavigation,
    EditTopic: EditTopicScreen,
    EditExamQuestion:  EditExamQuestionScreen,
    MyProfile: ProfileScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
