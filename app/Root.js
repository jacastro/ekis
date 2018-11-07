/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import RootStack from './router';
import { Font } from 'expo';

export default class RootApp extends React.Component {
  render() {
    return <RootStack />;
  }
}
