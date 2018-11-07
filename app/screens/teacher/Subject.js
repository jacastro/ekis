import React, {Component} from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {SwipeableFlatList, StyleSheet, Alert, Button} from 'react-native';
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import {ListItem,  Text,  BorderRadiuses, Colors, ThemeManager, View, Badge} from 'react-native-ui-lib';//eslint-disable-line
import * as Animatable from 'react-native-animatable';

const program = [
  {
    classNumber: 1,
    title: 'Inicio de la Primera Guerra Mundial',
    description: '',
    topics: [
      {
        title: 'Causas de la Primera Guerra Mundial',
        text: 'texto',
      },
      {
        title: 'El Inicio de la Gran Guerra',
        text: 'texto',
      },
      {
        title: 'Desarrollo de la Guerra',
        text: 'texto',
      },
    ],
    status: true,
    exam: false,
    done: true,
    image: "https://i.pinimg.com/236x/6f/35/89/6f3589e7bac00d0c935745098d586534--french-president-wwi.jpg"
  },
  {
    classNumber: 2,
    title: 'Fases de la Primera Guerra Mundial',
    description: '',
    topics: [
      {
        title: 'Primera Fase (1914)',
        text: 'Inicio de la guerra con el asesinato de Francisco Ferdinando, heredero del trono del Imperio Austro-húngaro, el 28 de junio de 1914. Ocurren varias declaraciones de guerra en el mes de agosto de 1914: a comienzos de mes, Alemania declara guerra a Rusia y luego a Francia. El 4 de agosto, el Reino Unido declara la guerra a Alemania. Un día después, el Imperio Austro-Húngaro declara guerra a Rusia.',
      },
      {
        title: 'Segunda Fase (de 1915 a 1916)',
        text: 'Fase conocida como guerra de trincheras. Disputas de territorio con muchas muertes y militares heridos. Estas batallas ocurrían, principalmente, en áreas rurales y poco habitadas. Las conquistas territoriales eran lentas y, también caracterizadas por el equilibrio entre los dos bloques. Después de salir de la Triple Alianza, Italia entra en mayo de 1915 en el bloque militar de la Triple Entente, fortaleciéndolo militarmente.',
      },
      {
        title: 'Tercera - Fase Final (1917 a 1918)',
        text: 'Salida de la Rusia de la guerra, en 1917, tras el evento de la Revolución Rusa.\nEntrada de los Estados Unidos, en abril de 1917, fortaleciendo el bloque militar de la Triple Entente. La entrada de los Estados Unidos es señalada, por muchos historiadores, como el factor decisivo para la victoria de la Triple Entente. En 1918, debilitados, los países de la Triple Alianza son derrotados. El Tratado de Paz se firma en París el 11 de noviembre de 1918.',
      },
    ],
    status: true,
    exam: false,
    done: false,
    image: "https://www.primeragranguerra.com/imagenes/Inicio-de-la-Primera-Guerra-Mundial.jpg"
  },
  {
    classNumber: 3,
    title: 'Fin de la Primera Guerra Mundial',
    description: '',
    topics: [
      {
        title: 'Tratado de Versalles',
        text: 'texto',
      }
    ],
    status: true,
    exam: true,
    done: false,
    image: "https://www.primeragranguerra.com/imagenes/Final-de-la-Primera-Guerra-Mundial.jpg"
  },
  {
    classNumber: 4,
    title: 'Consecuencias de la Primera Guerra Mundial',
    description: '',
    topics: [
      {
        title: 'Imperio otomano y austro-húngaro',
        text: 'texto',
      },
      {
        title: 'Liga de las Naciones',
        text: 'texto',
      },
      {
        title: 'Crisis económicas en Europa',
        text: 'texto',
      },
    ],
    status: true,
    exam: false,
    done: false,
    homeWork: true,
    image: "https://image.jimcdn.com/app/cms/image/transf/none/path/sa3898cbb3babc8cb/image/i268f947d0eb2450a/version/1524683217/image.jpg"
  }
];

class LessonListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: program.map((item,id) => ({ ...item, id, key: id.toString() })),
      onEdit: false,
      updating: false,
    };
  }

  onItemPressed(id) {
    alert(`item pressed: ${id}`); // eslint-disable-line
  }

  renderRow(row) {
    const statusColor = row.status ? Colors.green30 : Colors.red30;
    return (
      <ListItem
        activeBackgroundColor={Colors.dark60}
        activeOpacity={0.3}
        height={77.5}
        onPress={() => this.props.navigation.push('Lesson', { 
          lesson: row,
          program: this.state.program,
          onChange: (lesson) => {
            //lesson.topics[index] = topic;
            //this.props.navigation.getParam('onChange', {})(lesson)
            this.state.dataSource[lesson.id] = lesson;
            this.setState({ dataSource: this.state.dataSource })
          }
        })}
        animation="fadeIn"
        easing="ease-out-expo"
        duration={1000}
        useNativeDriver
        key={row.id.toString()}
      >
        <ListItem.Part left>
          <Animatable.Image
            source={{uri: row.image}}
            style={styles.image}
            animation="fadeInLeft"
            easing="ease-out-expo"
            duration={600}
            delay={10 + ((Number(row.id) % 12) * 40)}
            useNativeDriver
          />
        </ListItem.Part>
        <ListItem.Part middle column containerStyle={[styles.border, {paddingRight: 17}]}>
          <ListItem.Part containerStyle={{marginBottom: 3}}>
            { row.done && <Ionicons
              name='ios-checkmark-circle'
              size={20}
              style={{ color: Colors.green10, marginRight: 5 }}
            /> }
            <Text dark10 text70 style={{flex: 1, marginRight: 10}} numberOfLines={1}>{row.title}</Text>
            <Badge 
              label={row.topics.length.toString()} 
              backgroundColor={Colors.purple50}/>
          </ListItem.Part>
          <ListItem.Part>
            <Text style={{flex: 1, marginRight: 10}} text90 dark40 numberOfLines={1}>{`Clase ${row.classNumber} - 19/09/2018`}</Text>
            { row.exam && <Ionicons
              name='ios-paper'
              size={20}
              style={{ color: Colors.red10, marginLeft: 5 }}
            /> }
            { row.homeWork && <Ionicons
              name='ios-bookmarks'
              size={20}
              style={{ color: Colors.cyan10, marginLeft: 5 }}
            /> }
          </ListItem.Part>
        </ListItem.Part>
      </ListItem>
    );
  }

  renderQuickActions(item) {
    return (
      <View>
        <Text></Text>
      </View>
    )
  }

  render() {
    return (
      <SwipeableFlatList
        maxSwipeDistance={200}
        data={this.state.dataSource}
        renderItem={({item}) => this.renderRow(item)}
        renderQuickActions={({item}) => this.renderQuickActions(item)}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
});

const routes = {
  Program: {
    screen: LessonListScreen,
    navigationOptions: {
      title: 'Programa',
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
  Topics: {
    screen: LessonListScreen,
    navigationOptions: {
      title: 'Temas',
      tabBarLabel: 'Clases',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}
          size={26} 
          style={{ color: tintColor }}
        />
      ),
    },
  },
};

export const SubjectTeacherScreen = createBottomTabNavigator(
  routes,
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);

SubjectTeacherScreen.navigationOptions = ({ navigation }) => {
  console.log(SubjectTeacherScreen)
  return {
    title: routes[navigation.state.routes[navigation.state.index].routeName].navigationOptions.title,
    headerRight: (
      <Button
        onPress={() => console.log('press')}
        title="Agregar Clase"
      />
    ),
  };
};
