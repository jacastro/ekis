import React from 'react';
import RNcmp, { FlatList, ScrollView, ActivityIndicator, Image, RefreshControl } from 'react-native';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Badge} from 'react-native-ui-lib';
import { Cell, Separator, TableView, Section } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import {RkCard,RkText,RkButton, RkTheme, RkTextInput} from 'react-native-ui-kitten';

import { formatDayName, getSortedDays, createSubjects } from './../../utils/dates';
import { getSubjects } from '../../services/student';

export class LessonsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:  `Cronograma`,
      headerLeft: <RNcmp.Button onPress={() => navigation.navigate('MyProfile')} title="Mi Perfil"/>,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      subjects: [],
    }
  }

  componentDidMount = () => {
    this.loadData();
  };

  loadData = () => {
    this.setState({ loading: true })
    getSubjects().then((data) => {
      console.log("createSubjects", createSubjects());
      const subjects = createSubjects();
      data.forEach(subject => {
        subjects[subject.day].push(subject);
      });

      this.setState({ subjects, loading: false, subjectsCount: data.length })
    })
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this.loadData}
          />
        }
      >
        <TableView>
          {this.state.subjectsCount > 0 && getSortedDays().map((day) => 
            this.state.subjects[day].length > 0 && <Section key={day} header={formatDayName(day)} sectionTintColor='transparent'>
              {this.state.subjects[day].map((subject) => 
                <Cell
                  cellStyle="RightDetail"
                  detail={`${subject.hour}`}
                  title={`${subject.name}`}
                  accessory="DisclosureIndicator"
                  key={subject.id}
                  id={subject.name}
                  cellImageView={<Badge 
                    containerStyle={{marginRight: 5}}
                    label={subject.course.classroom} 
                    backgroundColor={Colors.blue50}/>}
                  onPress={() => this.props.navigation.push('Lesson', { subject })}
                />)}
            </Section>
          )}
        </TableView>
        { this.state.subjectsCount == 0 && 
          <Text marginT-40 text70 style={{ color: Colors.dark30, textAlign: "center" }}>No tenés materias asignadas</Text>
        }
      </ScrollView>
    )
  }
};

/*
cellImageView={clase.notifications > 0 ? <Ionicons
                    name="ios-notifications"
                    size={26}
                    style={{ marginRight: 10, }}
                  /> : null}
*/