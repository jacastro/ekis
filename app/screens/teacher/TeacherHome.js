import React from 'react';
import RNcmp, { ScrollView, RefreshControl } from 'react-native';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Badge} from 'react-native-ui-lib';
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import label from './../../utils/label';
import { getSubjects } from '../../services/teacher';

const defaultSubjects = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
};

export class TeacherHomeScreen extends React.Component {
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
      subjects: { ...defaultSubjects }
    }
  }

  componentDidMount = () => {
    this.loadData();
  };

  loadData = () => {
    this.setState({ loading: true })
    getSubjects().then((data) => {
      const subjects = { 
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [], 
      };
      data.forEach(subject => {
        subjects[subject.day].push(subject);
      });

      this.setState({ subjects, loading: false, subjectsCount: data.length })
    })
  };

  render() {
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
          {Object.keys(this.state.subjects).map((day) => 
            this.state.subjects[day].length > 0 && <Section key={day} header={label[day]} sectionTintColor='transparent'>
              {this.state.subjects[day].map((subject) => 
                <Cell
                  cellStyle="RightDetail"
                  detail={`${subject.hour}`}
                  title={`${subject.name}`}
                  accessory="DisclosureIndicator"
                  key={subject.name}
                  id={subject.name}
                  cellImageView={<Badge 
                    containerStyle={{marginRight: 5}}
                    label={subject.course.classroom} 
                    backgroundColor={Colors.blue50}/>}
                  onPress={() => this.props.navigation.push('LessonList', { subject })}
                />)}
            </Section>
          )}
        </TableView>
        { this.state.subjectsCount == 0 && <Text marginT-40 text70 style={{ color: Colors.dark30, textAlign: "center" }}>No tenés materias asignadas</Text>}
      </ScrollView>
    )
  }
}

/*
x<TextInput
          text50
          floatingPlaceholder
          placeholder="Título"
        />
        <TextInput
          text50
          floatingPlaceholder
          placeholder="Cuerpo" 
          expandable
        />
*/