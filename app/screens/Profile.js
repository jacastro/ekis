import React from 'react';
import { ScrollView, Switch, ActivityIndicator } from 'react-native';
import { Cell, TableView, Section } from 'react-native-tableview-simple';
import { View, Button, Text, ListItem, LoaderScreen, Colors} from 'react-native-ui-lib';
import { logout } from './../services/common';

export class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: 'Javier',
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title:  `Mi perfil`,
    };
  };

  componentDidMount = () => {
    /*getAttendance(this.state.course, this.state.date).then((students) => {
      this.props.navigation.setParams({'loading': false});
      this.setState({ students })
    })*/
  };

  logout = () => {
    logout().then(this.props.navigation.navigate('Auth'))
  }

  render() {
    return (
      <View>
        <View padding-30>
          <Text text30>{this.state.first_name}</Text>
          <Text text60>Preceptor</Text>
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