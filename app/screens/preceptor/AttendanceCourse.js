import React from 'react';
import { View, ScrollView, Switch, ActivityIndicator } from 'react-native';
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import { saveAttendance, getAttendance } from '../../services/preceptor';

export class AttendanceCourseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      half: false,
      students: [],
      date: props.navigation.getParam('date', '2018-11-01'),
      course: props.navigation.getParam('id', ''),
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title:  `Asistencia de ${navigation.getParam('name', '')}`,
      headerRight: navigation.getParam('loading', true) ? <ActivityIndicator style={styles.ai} size="small" /> : null,
    };
  };

  componentDidMount = () => {
    getAttendance(this.state.course, this.state.date).then((students) => {
      this.props.navigation.setParams({'loading': false});
      this.setState({ students })
    })
  };

  changeAttendance = (switchValue, index) => {
    const { date, course, half, students } = this.state;
    const value = switchValue ? (half ? 'half' : 'full') : 'none';

    this.props.navigation.setParams({'loading': true});

    saveAttendance(course, date, students[index].id, value, students[index].attendance_id).then((attendance) => {
      students[index].attendance_id = attendance ? attendance.id : null;
      students[index].attendance = value;

      this.setState({students: students});

      this.props.navigation.setParams({'loading': false});
    }).catch((error) => 
      console.log(error)
    );
  }

  render() {
    const { navigation } = this.props;
    const course = navigation.getParam('course', {});
    const colors = {
      full: "#4cd964",
      half: "#ffcc00",
      none: this.state.half ? "#ffcc00" : "#4cd964",
    }

    return (
      <View>
        <TableView>
          <Section header="Tipo de selección" sectionTintColor='transparent'>
            <Cell
              title="Asistencia completa"
              accessory={!this.state.half && "Checkmark"}
              onPress={() => this.setState({ half: false })}
            />
            <Cell
              title="Asistencia incompleta"
              accessory={this.state.half && "Checkmark"}
              onPress={() => this.setState({ half: true })}
            />
          </Section>
        </TableView>
        <ScrollView>
          <TableView>
            <Section header={course.name} sectionTintColor='transparent'>
              {this.state.students.map((student, index) => {
                const color = student.attendance === 'full'

                return <Cell
                  key={student.id}
                  title={`${student.last_name}, ${student.first_name}`}
                  accessory="DisclosureIndicator"
                  cellStyle="Basic"
                  cellAccessoryView={<Switch 
                    onTintColor={colors[student.attendance]}
                    onValueChange={value => this.changeAttendance(value, index)}
                    value={student.attendance !== 'none'} />}
                  contentContainerStyle={{ paddingVertical: 4 }}
                />
              })}
            </Section>
          </TableView>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  ai: {
    marginRight: 20,
  }
}