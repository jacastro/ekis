import React from 'react';
import { ScrollView, Switch, ActivityIndicator } from 'react-native';
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import { View, Button, Text, ListItem, LoaderScreen, Colors} from 'react-native-ui-lib';
import { logout, getUser } from './../services/common';
import label from './../utils/label';

export class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title:  `Mi perfil`,
    };
  };

  componentDidMount = () => {
    getUser().then(data => this.setState(data))
  };

  logout = () => {
    logout().then(this.props.navigation.navigate('Auth'))
  }

  render() {
    return (
      <View>
        <View padding-30>
          <Text text30>{this.state.first_name} {this.state.last_name}</Text>
          <Text text60>{label[this.state.type]}</Text>
          {this.state.course && <Text text70>
            Curso {this.state.course.name} - 
            Turno {label[this.state.course.shift]} - 
            Aula {this.state.course.classroom}
          </Text>}
        </View>
        <Button
          fullWidth
          label="Cerrar Sesión"
          marginB-10
          onPress={this.logout}
        />
        <Button
          fullWidth
          label="Cancelar"
          marginB-10
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    )
  }
}

const styles = {
  ai: {
    marginRight: 20,
  }
}