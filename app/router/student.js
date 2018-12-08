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
import { LessonsScreen } from '../screens/student/Lessons';
import { LessonScreen } from '../screens/student/Lesson';
import { ExamScreen } from '../screens/student/Exam';
import { ViewExamScreen } from '../screens/student/ViewExam';
import { QualificationReportScreen } from '../screens/student/QualificationReport';
import { ProgramScreen } from '../screens/student/Program';
import { FeedbackScreen } from '../screens/student/Feedback';

const TabNav = createBottomTabNavigator(
  {
    Cronograma: {
      screen: LessonsScreen,
      path: '/clases',
      navigationOptions: {
        title: 'Clases',
        tabBarLabel: 'Clases',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-folder-open' : 'ios-folder-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Novedades: {
      screen: QualificationReportScreen,
      path: '/novedades',
      title: 'Novedades',
      navigationOptions: {
        title: 'Novedades',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    QualificationReport: {
      screen: QualificationReportScreen,
      path: '/boletin',
      title: 'Boletin',
      navigationOptions: {
        title: 'Boletin',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Settings: {
      screen: QualificationReportScreen,
      path: '/settings',
      title: 'Settings',
      navigationOptions: {
        title: 'Settings',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-body' : 'ios-body-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);
 
TabNav.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.state.routes[navigation.state.index].routeName,
    headerLeft: <Button onPress={() => navigation.navigate('MyProfile')} title="Mi Perfil"/>,
  };
};

const MenuNavigation = createStackNavigator({
  Root: {
    screen: TabNav,
  },
  Lesson: LessonScreen,
  ViewExam: ViewExamScreen
});

export default createStackNavigator(
  {
    Main: {
      screen: MenuNavigation,
    },
    Exam: {
      screen: ExamScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Program: {
      screen: ProgramScreen,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
    Feedback: FeedbackScreen,
    MyProfile: ProfileScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
