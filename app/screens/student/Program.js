import React from 'react';
import { ScrollView, StatusBar, Text, SectionList,FlatList, View, Alert, AppState, Button, Dimensions, Image } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { Stars } from './../../components/Stars';

import { Ionicons } from '@expo/vector-icons';

export class ProgramScreen extends React.Component {
  item = {
    classNumber: 2,
    title: 'Fases de la Primera Guerra Mundial',
    description: '',
    image: 'https://sobrehistoria.com/wp-content/uploads/2011/03/primera-guerra-mundial-resumen-600x374.jpg',
    topics: [
      {
        title: 'Primera Fase (1914)',
        text: [
          'Inicio de la guerra con el asesinato de Francisco Ferdinando, heredero del trono del Imperio Austro-húngaro, el 28 de junio de 1914.',
          'Ocurren varias declaraciones de guerra en el mes de agosto de 1914: a comienzos de mes, Alemania declara guerra a Rusia y luego a Francia. El 4 de agosto, el Reino Unido declara la guerra a Alemania. Un día después, el Imperio Austro-Húngaro declara guerra a Rusia.'
        ],
      },
      {
        title: 'Segunda Fase (de 1915 a 1916)',
        text: [
          'Fase conocida como guerra de trincheras. Disputas de territorio con muchas muertes y militares heridos. Estas batallas ocurrían, principalmente, en áreas rurales y poco habitadas. Las conquistas territoriales eran lentas y, también caracterizadas por el equilibrio entre los dos bloques.',
          'Después de salir de la Triple Alianza, Italia entra en mayo de 1915 en el bloque militar de la Triple Entente, fortaleciéndolo militarmente.'
        ],
      },
      {
        title: 'Tercera - Fase Final (1917 a 1918)',
        text: [
          'Salida de la Rusia de la guerra, en 1917, tras el evento de la Revolución Rusa.\nEntrada de los Estados Unidos, en abril de 1917, fortaleciendo el bloque militar de la Triple Entente. La entrada de los Estados Unidos es señalada, por muchos historiadores, como el factor decisivo para la victoria de la Triple Entente.',
          'En 1918, debilitados, los países de la Triple Alianza son derrotados. El Tratado de Paz se firma en París el 11 de noviembre de 1918.'
        ],
      }
    ],
    status: true,
    exam: false,
    done: true
  }
  render() {
    const item = this.item;
    return (
      <ScrollView style={style.main}>
        <View style={style.header}>
          <Text style={style.header_title}>{ item.title }</Text>
          {item.done && <Ionicons
            name="ios-checkmark-circle"
            size={26}
            style={style.header_icon}
          />}
        </View>
        {item.image && <Image source={{uri: item.image}} style={style.image} />}
        <View style={style.content}>
          {item.topics.map(topic =>
            <View style={style.topic} key={topic.title}>
              <Text style={style.topic_title}>{ topic.title }</Text>
              {topic.text.map(text => <Text key={text} style={style.topic_text}>{ text }</Text>)}
            </View>
          )}
        </View>
        <View style={style.footer}>
          <Button
            style={style.button}
            title='Cerrar'
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </ScrollView>
    )
  }
}

const style = {
  main: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 30,
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  header_title: {
    fontSize: 24,
    alignSelf: 'flex-start',
    marginRight: 20,
    fontWeight: 'bold'
  },
  header_icon: {
    marginLeft: 'auto',
    marginBottom: 'auto',
    padding: 2,
    color: 'green'
  },
  image: {
    marginTop: 24,
    height: 200
  },
  topic_title: {
    fontSize: 18,
    alignSelf: 'flex-start',
    fontWeight: '600',
    paddingTop: 24,
    paddingBottom: 10,
  },
  topic_text: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: '#999',
  },
  footer: {
    flex: 1,
    marginBottom: 50,
  },
  button: {
    margin: 30,
  }
};
