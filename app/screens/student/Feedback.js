import React from 'react';
import { ScrollView, StatusBar, SectionList,FlatList, Alert, AppState, Dimensions } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import {View, TextInput, Text, Button, ListItem, LoaderScreen, Colors, Card, Avatar, Picker, TagsInput, TextArea} from 'react-native-ui-lib';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { Stars } from './../../components/Stars';

export class FeedbackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.navigation.getParam('type', 'lesson'),
      title: props.navigation.getParam('title', 'Evaluar Clase 2'),
      description: props.navigation.getParam('description', 'Fases de la Primera Guerra Mundial'),
      rate: 3,
      comment: "",
    }
  }

  render() {
    return (
      <View useSafeArea flex style={{ backgroundColor: "#ffffff" }}>
        <View padding-30>
          <View paddingB-30>
            <Text text30>Evaluar Clase 2</Text>
            <Text text60>Fases de la Primera Guerra Mundial</Text>
          </View>
          <View paddingB-30>
            <Stars
              disabled={false}
              maxStars={5}
              rating={1}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              selectedStar={(rating) => console.log(rating)}
              fullStarColor={Colors.yellow20}
            />
          </View>
          <TextInput
            text70
            containerStyle={{marginBottom: 10}}
            floatingPlaceholder
            placeholder="Comentarios"
            //onChangeText={this.onChangeTitle}
            //value={this.state.title}
            floatOnFocus
          />
          <Text text70 marginB-40 style={{ color: Colors.dark60, textAlign: "center" }}>
            El docente no podrá ver quién realizó este comentario
          </Text>
          <Button
            onPress={() => this.props.navigation.goBack()}
            label="Guardar calificación"
          />
        </View>
      </View>
    )
  }
}
