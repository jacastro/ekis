import React from 'react';
import { ScrollView, DatePickerIOS, Button } from 'react-native';
import {View, TextInput, Text, ListItem, LoaderScreen, Colors} from 'react-native-ui-lib';
import { getCourses } from '../../services/preceptor';
import { Cell, TableView, Section } from 'react-native-tableview-simple';

import label from './../../utils/label';

export class AttendanceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      chosenDate: new Date()
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title:  `Cursos`,
      headerLeft: <Button onPress={() => navigation.navigate('MyProfile')} title="Mi Perfil"/>,
    };
  };

  componentDidMount = () => {
    getCourses().then((courses) => this.setState({ courses }))
  };

  setDate = (newDate) => {
    this.setState({chosenDate: newDate})
  }

  render() {
    const { courses } = this.state;
    const chosenDate = this.state.chosenDate.toJSON()
    const date = chosenDate.substring(0,chosenDate.indexOf("T"))
    console.log(date,chosenDate)

    return (
      courses && courses.length == 0 ?
        <View flex>
          <LoaderScreen
            overlay
            backgroundColor={Colors.rgba(Colors.dark80, 0.85)}
          />
        </View> :
        <ScrollView>
          <DatePickerIOS
            mode="date"
            date={this.state.chosenDate}
            onDateChange={(date) => this.setDate(date)}
            locale="es_ar"
            timeZoneOffsetInMinutes={0}
          />
          <TableView>
            {courses.map(({ id, name, classroom = 'Ninguna', shift, students_count}) =>
              <Section key={id} header={`Curso: ${name}`} sectionTintColor='transparent'>
                <Cell cellStyle="RightDetail" detail={classroom} title="Aula" />
                <Cell cellStyle="RightDetail" detail={label[shift]} title="Turno" />
                <Cell
                  cellStyle="RightDetail"
                  detail={`${students_count} alumnos`}
                  title="Tomar asistencia"
                  accessory="DisclosureIndicator"
                  titleTextColor="#007AFF"
                  onPress={() => this.props.navigation.push('AttendanceCourse', { name, id, date })}
                />
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
