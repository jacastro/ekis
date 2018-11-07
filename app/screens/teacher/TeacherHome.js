import React from 'react';
import RNcmp, { ScrollView } from 'react-native';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Badge} from 'react-native-ui-lib';
import axios from 'axios';

import { Cell, TableView, Section } from 'react-native-tableview-simple';

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
      data: [
        {
          date: 'Lunes',
          subjects: [
            {
              name: 'Matemática 2',
              aula: '302',
              time: '10:00'
            },
            {
              name: 'Matemática 1',
              aula: '501',
              time: '11:15'
            }
          ]
        },
        {
          date: 'Martes',
          subjects: [
            {
              name: 'Matemática 1',
              aula: '212',
              time: '10:00'
            },
            {
              name: 'Estadística',
              aula: '104',
              time: '11:15'
            }
          ]
        }
      ],
    }
  }

  /*componentDidMount = () => {
    axios.get('https://uade-sem-int-tpo-api.herokuapp.com/courses')
      .then((response) => {
        this.setState({
          courses: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  };*/

  render() {
    return (
      this.state.data.length == 0 ?
        <View flex>
          <LoaderScreen
            overlay
            backgroundColor={Colors.rgba(Colors.dark80, 0.85)}
          />
        </View> : 
        <ScrollView>
          <TableView>
            {this.state.data.map((day) => 
              <Section key={day.date} header={day.date} sectionTintColor='transparent'>
                {day.subjects.map((subject) => 
                  <Cell
                    cellStyle="RightDetail"
                    detail={`${subject.time}`}
                    title={`${subject.name}`}
                    accessory="DisclosureIndicator"
                    key={subject.name}
                    id={subject.name}
                    cellImageView={<Badge 
                      containerStyle={{marginRight: 5}}
                      label={subject.aula} 
                      backgroundColor={Colors.blue50}/>}
                    onPress={() => this.props.navigation.push('LessonList', { subject })}
                  />)}
              </Section>
            )}
          </TableView>
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