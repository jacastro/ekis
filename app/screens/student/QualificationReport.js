import React from 'react';
import { FlatList, ScrollView, ActivityIndicator, View, Text, Image,StyleSheet } from 'react-native';

import { Cell, Separator, TableView, Section } from 'react-native-tableview-simple';
import { Ionicons } from '@expo/vector-icons';
import {RkCard,RkText,RkButton, RkTheme, RkTextInput} from 'react-native-ui-kitten';
import { Table, TableWrapper, Row } from 'react-native-table-component';

export class QualificationReportScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Materia', 'Examen 1', 'Examen 2', 'Examen 3', 'Final'],
      widthArr: [100, 80, 80, 80, 80]
    }
  }
 
  render() {
    const state = this.state;
    let tableData = [
      ['1', '2', '3', '4','a'],
      ['a', 'b', 'c', 'd','a'],
      ['1', '2', '3', '456\n789','a'],
      ['a', 'b', 'c', 'd','a']
    ]
 
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 0}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F4F4F4'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 40, backgroundColor: '#f1f8ff' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: 0 },
  row: { height: 40, backgroundColor: '#FDFDFD' }
});