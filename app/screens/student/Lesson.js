import React from 'react';
import axios from 'axios';
import { ActivityIndicator, ScrollView, StatusBar, SectionList,FlatList, View, Alert, AppState, TouchableOpacity } from 'react-native';
import {
  SafeAreaView,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';

import Carousel from 'react-native-snap-carousel';
import { StatsCol } from './../../components/StatsCol';
import { Label } from './../../components/Label';

import { sliderWidth, itemWidth } from './../../styles/SliderEntry.style';
import { Colors, Button, Text } from 'react-native-ui-lib';

export class LessonScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program: [
        {
          classNumber: 1,
          title: 'Inicio de la Primera Guerra Mundial',
          description: '',
          topics: [
            'Causas de la Primera Guerra Mundial',
            'El Inicio de la Gran Guerra',
            'Desarrollo de la Guerra'
          ],
          status: true,
          exam: false,
          done: true
        },
        {
          classNumber: 2,
          title: 'Fases de la Primera Guerra Mundial',
          description: '',
          topics: [
            'Primera Fase (1914)',
            'Segunda Fase (de 1915 a 1916)',
            'Tercera - Fase Final (1917 a 1918)'
          ],
          status: true,
          exam: true,
          done: false
        },
        {
          classNumber: 3,
          title: 'Fin de la Primera Guerra Mundial',
          description: '',
          topics: ['Tratado de Versalles'],
          status: true,
          exam: true,
          done: false
        },
        {
          classNumber: 4,
          title: 'Consecuencias de la Primera Guerra Mundial',
          description: '',
          topics: ['Imperio otomano y austro-húngaro','Liga de las Naciones','Crisis económicas en Europa'],
          status: true,
          exam: false,
          done: false,
          homeWork: true,
        }
      ],
      stats: [
        { title: '10:00', description: 'Martes'},
        { title: '4.5', description: 'Clasificación'},
        { title: '7.6', description: 'Promedio'}
      ],
      organizations: []
    }
  }

  componentDidMount = () => {
    console.log("\ncargando\n")
    axios.get('https://uade-sem-int-tpo-api.herokuapp.com/organizatios')
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.setState({
          organizations: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  _renderItem ({item, index}) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.props.navigation.push('Program')}
      >
        <View style={style.carousel.slide}>
          <View style={style.carousel.slide_header}>
            <Text style={style.carousel.slide_header_title}>{ item.title }</Text>
            {item.done && <Ionicons
              name="ios-checkmark-circle"
              size={26}
              style={style.carousel.slide_header_icon}
            />}
          </View>
          <View style={style.carousel.slide_topics}>
            {item.topics.map(topic =>
              <Text
                key={topic}
                style={style.carousel.slide_topics_item}>
                { topic }
              </Text>
            )}
          </View>
          {(item.exam || item.homeWork) && <View style={style.carousel.slide_footer}>
            {item.exam && <Label text='EXAMEN' color='red'/>}
            {item.homeWork && <Label text='TAREA' color='skyblue'/>}
          </View>}
        </View>
      </TouchableOpacity>
    );
  }

  render () {
    let currentClass = 0;
    this.state.program.forEach((program,index) => {
      if(program.done) currentClass = index;
    })

    const navigation = this.props.navigation;

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{ flexDirection: 'row', backgroundColor: '#FFF' }}>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            firstItem={currentClass+1}
            data={this.state.program}
            renderItem={this._renderItem.bind(this)}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            containerCustomStyle={style.carousel.slider}
          />
        </View>

        <ScrollView>
          <View style={style.exam}>
            <Text text60 style={style.examText}>Esta clase tiene un examen asignado</Text>
            <Button
              style={style.examButton}
              text70
              label="Realizar examen"
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
          </View>
          <TableView>
            <Section sectionTintColor='transparent'>
              <Cell
                accessory="DisclosureIndicator"
                cellStyle="RightDetail"
                title="Evaluar esta clase"
                detail={"Clase 1"}
                onPress={() => navigation.navigate('Feedback')}
              />
              <Cell
                accessory="DisclosureIndicator"
                cellStyle="RightDetail"
                title="Evaluar al docente"
                detail={"Javier Castro"}
                onPress={() => navigation.navigate('Feedback')}
              />
            </Section>
            <Section header="Información de esta clase" sectionTintColor='transparent'>
              <Cell
                cellStyle="RightDetail"
                title="Examen de clase"
                detail={"No realizado"}
              />
              <Cell
                cellStyle="RightDetail"
                title="Asistencia"
                detail={"Media falta"}
              />
              {/*<Cell
                cellStyle="RightDetail"
                title="Tarea"
                detail={"Páginas 3,4 y 5"}
              />*/}
              <Cell
                accessory="DisclosureIndicator"
                cellStyle="RightDetail"
                title="Notificaciones y comentarios"
                detail={"2"}
                onPress={() => this.setState({ half: true })}
              />
            </Section>
            <Section header="Información de la materia" sectionTintColor='transparent'>
              <Cell
                cellStyle="RightDetail"
                title="Promedio actual"
                detail={"7.50"}
              />
              <Cell
                cellStyle="RightDetail"
                title="Día de cursada"
                detail={"Lunes"}
              />
              <Cell
                accessory="DisclosureIndicator"
                cellStyle="RightDetail"
                title="Notificaciones y comentarios"
                detail={"3"}
                onPress={() => this.setState({ half: true })}
              />
            </Section>
          </TableView>
          {this.state.organizations.length == 2 ? <ActivityIndicator size="large" /> :
            <TableView>
              <Section header="" sectionTintColor='transparent'>
                {this.state.organizations.map(org => <Cell
                  key={org.id}
                  title={org.name}
                  accessory="DisclosureIndicator"
                  onPress={() => navigation.navigate('Profile', { name: 'Jordan' })}
                />)}
              </Section>
            </TableView>
          }
        </ScrollView>
      </View>
    );
  }
};

const style = {
  exam: {
    backgroundColor: Colors.orange40,
    padding: 20,
  },
  examText: {
    marginBottom: 10,
    color: "#fff",
    textAlign: "center"
  },
  examButton: {
    backgroundColor: Colors.orange10,
  },
  carousel: {
    slide: {
      height: 200,
      backgroundColor: '#F6F6F6',
      shadowOpacity: 0.75,
      shadowRadius: 10,
      shadowColor: '#999',
      borderRadius: 10,
      shadowOffset: { height: 10, width: 0 },
      padding: 15,
    },
    slide_header: {
      flex: 1,
      flexDirection:'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    slide_header_number: {
      fontSize: 22,
    },
    slide_header_title: {
      fontSize: 22,
      alignSelf: 'flex-start',
      marginRight: 20,
    },
    slide_header_icon: {
      marginLeft: 'auto',
      marginBottom: 'auto',
      padding: 2,
      color: 'green'
    },
    slide_topics_item: {
      fontSize: 14,
      paddingTop: 4,
      //paddingHorizontal: 5,
      color: '#666'
    },
    slide_footer: {
      flexDirection: 'row',
      paddingTop: 10,
    },
    slider: {
      paddingVertical: 25,
    }
  }
}
