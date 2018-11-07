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
import { AttendanceScreen } from '../screens/preceptor/Attendance';
import { AttendanceCourseScreen } from '../screens/preceptor/AttendanceCourse';

const MenuNavigation = createStackNavigator({
  Root: {
    screen: AttendanceScreen,
  },
  AttendanceCourse: {
    screen: AttendanceCourseScreen,
  },
});

export default createStackNavigator(
  {
    Main: MenuNavigation,
    MyProfile: ProfileScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
