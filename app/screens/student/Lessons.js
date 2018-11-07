import React from 'react';
import RNcmp, { FlatList, ScrollView, ActivityIndicator, View, Text, Image } from 'react-native';

import { Cell, Separator, TableView, Section } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import {RkCard,RkText,RkButton, RkTheme, RkTextInput} from 'react-native-ui-kitten';

RkTheme.setType('RkCard', 'story', {
  img: {
    height: 100,
    opacity: 0.7
  },
  header: {
    alignSelf: 'center'
  },
  content:{
    alignSelf:'center'
  }
});
RkTheme.setType('RkTextInput', 'frame', {
  input: {
    backgroundColor: '#000',
    marginLeft: 0,
    marginHorizontal: 0,
    borderRadius: 5
  },
  color: 'gray',
  backgroundColor: 'gray',
  borderRadius: 10,
  container: {
    paddingHorizontal: 20
  }
});

const data = {
  Hoy: [
    {
      title: 'Matemática',
      notifications: 3,
      hour: '10:00am'
    },
    {
      title: 'Lengua',
      notifications: 0,
      hour: '12:00am'
    },
  ],
  Mañana: [
    {
      title: 'Educación Física',
      notifications: 0,
      hour: '9:00am'
    },
    {
      title: 'Ciencias Sociales',
      notifications: 0,
      hour: '10:30am'
    },
  ],
};

export class LessonsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:  `Cronograma`,
      headerLeft: <RNcmp.Button onPress={() => navigation.navigate('MyProfile')} title="Mi Perfil"/>,
    };
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <ScrollView>
        <TableView>
          {Object.keys(data).map(function(day, index) {
            const clases = data[day];
            return <Section header={day} key={day} sectionTintColor='transparent'>
              {clases.map((clase) =>
                <Cell
                  key={clase.title}
                  cellStyle="RightDetail"
                  detail={clase.hour}
                  title={clase.title}
                  accessory="DisclosureIndicator"
                  cellImageView={clase.notifications > 0 ? <Ionicons
                    name="ios-notifications"
                    size={26}
                    style={{ marginRight: 10, }}
                  /> : null}
                  onPress={() => navigation.navigate('Lesson', { name: clase.title })}
                />
              )}
            </Section>
          })}
        </TableView>
      </ScrollView>
    )
  }
};
