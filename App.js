import React, {Component} from 'react';
import { ActivityIndicator, Alert, Text, AsyncStorage, View } from 'react-native';

import { AuthScreen } from './app/screens/Auth'
import { LoginScreen } from './app/screens/Login'
import { ProfileScreen } from './app/screens/Profile';

import StudentApp from './app/router/student'
//import ParentApp from './app/router/parent'
import TeacherApp from './app/router/teacher'
import PreceptorApp from './app/router/preceptor'
//import PrincipalApp from './app/router/principal'

import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

const Login = createStackNavigator({ LogIn: LoginScreen });

export default createSwitchNavigator(
  {
    Auth: AuthScreen,
    PreceptorApp,
    StudentApp,
    TeacherApp,
    Login,
  },
  {
    initialRouteName: 'Auth',
  }
);


