import React from 'react';
import StarRating from 'react-native-star-rating';
import { Font } from 'expo';

export class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return ( this.state.fontLoaded ? <StarRating {...this.props}/> : null)
  }
} 