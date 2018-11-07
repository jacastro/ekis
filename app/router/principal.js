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

import { ClasesScreen } from '../screens/Clases';
import { LessonScreen } from '../screens/Lesson';
import { ExamScreen } from '../screens/Exam';
import { BoletinScreen } from '../screens/Boletin';
import { ProgramScreen } from '../screens/Program';

export const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <StatusBar barStyle="default" />
  </ScrollView>
);

const Novedades = ({ navigation }) => (
  <ScrollView>
    <MyNavScreen banner="Home Screen" navigation={navigation} />
    <TableView>
      <Section header="Hoy">
        <Cell
          cellStyle="RightDetail"
          accessory="DisclosureIndicator"
          detail="Detail"
          title="Pressable w/ accessory"
          accessory="DisclosureIndicator"
          onPress={() => navigation.push('MyModal', { name: 'Jordan' })}
        />
      </Section>
    </TableView>
  </ScrollView>
);



const MyNotificationsSettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Notifications Screen" navigation={navigation} />
);

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Settings Screen" navigation={navigation} />
);

const TabNav = createBottomTabNavigator(
  {
    Lessons: {
      screen: ClasesScreen,
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
      screen: Novedades,
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
    Boletin: {
      screen: BoletinScreen,
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
      screen: MySettingsScreen,
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
  };
};

const MenuNavigation = createStackNavigator({
  Root: {
    screen: TabNav,
  },
  Lesson: {
    screen: LessonScreen,
    path: '/clase/:name',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
      headerRight: (
        <Button
          onPress={() =>
            Alert.alert(
              '¡Atención!',
              'No podrás salir del examen antes de finalizar el mismo. Tampoco podrás cambiar de pestaña o el examen se anulará',
              [
                {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Continuar', onPress: () => navigation.navigate('Exam')},
              ],
              { cancelable: false }
            )}
          title="Examen"
        />
      ),
    }),
  },
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
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
