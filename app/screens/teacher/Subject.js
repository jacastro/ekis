import React, {Component} from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {FlatList, StyleSheet, Alert, Button, AlertIOS, RefreshControl, ScrollView} from 'react-native';
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import RNUIL, {ListItem,  Text,  BorderRadiuses, Colors, ThemeManager, View, Badge, LoaderScreen} from 'react-native-ui-lib';//eslint-disable-line
import * as Animatable from 'react-native-animatable';
import { createLesson, getSubject } from '../../services/teacher';

export class SubjectTeacherScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Programa",
      headerRight: (
        !navigation.getParam('loading', true) && <Button
          onPress={navigation.getParam('createLesson',() => console.log("unmounted"))} 
          title="Agregar Clase"
        />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      subjectShoot: props.navigation.getParam('subject', {}),
      loading: true,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ createLesson: this._onCreateLesson, loading: true });
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true })
    getSubject(this.state.subjectShoot.id).then((subject) => {
      this.setState({ subject, loading: false })
      this.props.navigation.setParams({ loading: false });
    })
  }

  _onCreateLesson = () => {
    const { subject } = this.state;
    AlertIOS.prompt(
      'Agregar clase',
      'Ingresa el título de la nueva clase para poder continuar',
      text => createLesson(subject.id, text).then(lesson => {
        const index = subject.lessons.length;
        const newLesson = { ...lesson, index, key: index.toString() };
        subject.lessons.push(newLesson);
        this.setState({ subject })
        this.props.navigation.push('Lesson', { 
          lesson: newLesson,
          onChange: (lesson) => {
            subject.lessons[lesson.index] = lesson;
            this.setState({ subject: this.state.subject })
          },
          deleteLesson: (lesson) => {
            subject.lessons.splice(lesson.index, 1),
            this.setState({ subject: subject })
          },
        })
      })
    )
  };

  renderRow(row) {
    return (
      <ListItem
        activeBackgroundColor={Colors.dark60}
        activeOpacity={0.9}
        height={77.5}
        success={(key) => console.log("success",key)}
        onPress={() => this.props.navigation.push('Lesson', { 
          lesson: row,
          onChange: (lesson) => {
            this.state.subject.lessons[lesson.index] = lesson;
            this.setState({ subject: this.state.subject })
          },
          deleteLesson: (lesson) => {
            this.state.subject.lessons.splice(lesson.index, 1),
            this.setState({ subject: this.state.subject })
          },
        })}
        animation="fadeIn"
        easing="ease-out-expo"
        duration={1000}
        useNativeDriver
        key={row.id.toString()}
      >
        <ListItem.Part left>
          <Animatable.Image
            source={{uri: row.picture_url}}
            style={styles.image}
            animation="fadeInLeft"
            easing="ease-out-expo"
            duration={600}
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
              label={row.topics_count.toString()} 
              backgroundColor={Colors.purple50}/>
          </ListItem.Part>
          <ListItem.Part>
            <Text style={{flex: 1, marginRight: 10}} text90 dark40 numberOfLines={1}>{`Clase ${row.class_number} - ${row.date}`}</Text>
            { row.exam_enabled && <Ionicons
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

  render() {
    const { loading, subject } = this.state;
    const dataSource = !loading && subject.lessons.map((item,index) => ({ ...item, index, key: index.toString() }));

    return ( 
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={this.loadData}
          />
        }
      >
        {subject &&
          <FlatList
            data={dataSource}
            renderItem={({item}) => this.renderRow(item)}
          />
        }
      </ScrollView>
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
